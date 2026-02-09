import { createCipheriv, scryptSync, randomBytes } from 'crypto'

import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const reqBody = await req.formData()

  console.log({ reqBody })
  const file = reqBody.get('file') as File
  const password = reqBody.get('password') as string

  console.log({ file, password })

  try {
    const bytes = await file.arrayBuffer()
    const fileBuffer = Buffer.from(bytes)
    const base64String = Buffer.from(fileBuffer).toString('base64')

    // 2. Thiết lập mã hóa
    const algorithm = 'aes-256-cbc'
    const salt = process.env.CRYPTO_SALT || 'your-very-long-salt'
    const key = scryptSync(password, salt, 32)
    const iv = randomBytes(16)

    // 3. Mã hóa chuỗi Base64
    const cipher = createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(base64String, 'utf8', 'hex')

    encrypted += cipher.final('hex')
    const fileName = `${file.name}.enc`

    return Response.json({ message: 'Đã khóa file thành công thành locked-key.enc', encrypted })
  } catch (error) {
    return Response.json({ error: 'Lỗi mã hóa' }, { status: 500 })
  }
}
