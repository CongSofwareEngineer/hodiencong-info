// lib/cryptoManager.ts
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'

import argon2 from 'argon2'

import { CONFIG_ARGON2_CIPHER, CONFIG_ARGON2_DEFAULT } from '@/constants/argon2'

// Helper: Đóng gói [salt][iv][ciphertext][tag] → Base64
const packPayload = (salt: Buffer, iv: Buffer, ciphertext: Buffer, tag: Buffer): string => {
  return Buffer.concat([salt, iv, ciphertext, tag]).toString(CONFIG_ARGON2_CIPHER.encoding)
}

// Helper: Tách payload Base64 → các thành phần
const unpackPayload = (
  packed: string
): {
  salt: Buffer
  iv: Buffer
  ciphertext: Buffer
  tag: Buffer
} => {
  const buffer = Buffer.from(packed, CONFIG_ARGON2_CIPHER.encoding)
  let offset = 0

  const salt = buffer.slice(offset, offset + CONFIG_ARGON2_DEFAULT.saltLength)

  offset += CONFIG_ARGON2_DEFAULT.saltLength

  const iv = buffer.slice(offset, offset + CONFIG_ARGON2_CIPHER.ivLength)

  offset += CONFIG_ARGON2_CIPHER.ivLength

  const tag = buffer.slice(buffer.length - CONFIG_ARGON2_CIPHER.tagLength)
  const ciphertext = buffer.slice(offset, buffer.length - CONFIG_ARGON2_CIPHER.tagLength)

  return { salt, iv, ciphertext, tag }
}

/**
 * 🔒 Mã hóa Private Key
 * @param data - Dữ liệu nhạy cảm cần mã hóa (string)
 * @param password - Mật khẩu người dùng (không lưu trữ, chỉ dùng để derive key)
 * @returns Payload đã mã hóa (Base64 string) để lưu vào DB/file
 */
export const encryptData = async (data: string, password: string): Promise<string> => {
  // 1. Sinh salt & IV ngẫu nhiên (CSPRNG)
  const salt = randomBytes(CONFIG_ARGON2_DEFAULT.saltLength)
  const iv = randomBytes(CONFIG_ARGON2_CIPHER.ivLength)

  // 2. Derive key bằng Argon2id (chống GPU/ASIC attack)
  const derivedKey = await argon2.hash(password, {
    ...CONFIG_ARGON2_DEFAULT,
    salt,
  })
  // hash() trả về Buffer khi raw: true
  const keyBuffer = Buffer.isBuffer(derivedKey) ? derivedKey : Buffer.from(derivedKey as string, 'hex')

  // 3. Mã hóa AES-256-GCM
  const cipher = createCipheriv(CONFIG_ARGON2_CIPHER.algorithm, keyBuffer.slice(0, 32), iv)
  let encrypted = cipher.update(data, 'utf8')

  encrypted = Buffer.concat([encrypted, cipher.final()])
  const authTag = cipher.getAuthTag()

  // 4. Đóng gói → Base64 để lưu trữ
  return packPayload(salt, iv, encrypted, authTag)
}

/**
 * 🔓 Giải mã Private Key
 * @param data - Base64 string từ encryptData()
 * @param password - Mật khẩu người dùng để verify & derive key
 * @returns Private Key gốc (string)
 */
export const decryptData = async (data: string, password: string): Promise<string> => {
  // 1. Tách các thành phần từ data
  const { salt, iv, ciphertext, tag } = unpackPayload(data)

  // 2. Verify password + derive key bằng Argon2id
  const derivedKey = await argon2.hash(password, {
    ...CONFIG_ARGON2_DEFAULT,
    salt,
  })
  const keyBuffer = Buffer.isBuffer(derivedKey) ? derivedKey : Buffer.from(derivedKey as string, 'hex')

  // 3. Giải mã + xác thực GCM (sai password/tag → throw ngay)
  const decipher = createDecipheriv(CONFIG_ARGON2_CIPHER.algorithm, keyBuffer.slice(0, 32), iv)

  decipher.setAuthTag(tag)
  let decrypted = decipher.update(ciphertext)

  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString('utf8')
}

/**
 * 🔄 Đổi mật khẩu mà không cần giải mã lại dữ liệu
 * (Re-derive key với salt cũ + password mới → re-encrypt ciphertext)
 */
export const changePassword = async (payload: string, oldPassword: string, newPassword: string): Promise<string> => {
  const { salt, iv, ciphertext, tag } = unpackPayload(payload)

  // Verify old password
  await argon2.hash(oldPassword, {
    ...CONFIG_ARGON2_DEFAULT,
    salt,
  })

  // Derive new key với same salt
  const newKey = await argon2.hash(newPassword, {
    ...CONFIG_ARGON2_DEFAULT,
    salt,
  })
  const newKeyBuffer = Buffer.isBuffer(newKey) ? newKey : Buffer.from(newKey as string, 'hex')

  // Re-encrypt với key mới (giữ nguyên iv, salt để không cần lưu thêm metadata)
  const cipher = createCipheriv(CONFIG_ARGON2_CIPHER.algorithm, newKeyBuffer.slice(0, 32), iv)
  let encrypted = cipher.update(ciphertext)

  encrypted = Buffer.concat([encrypted, cipher.final()])
  const newTag = cipher.getAuthTag()

  return packPayload(salt, iv, encrypted, newTag)
}
