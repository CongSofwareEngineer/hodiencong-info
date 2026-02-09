export enum SecureDataType {
  PRIVATE_KEY = 'privateKey',
  SEED_PHRASE = 'seedPhrase',
  PASSWORD = 'password',
}

export interface SecureData {
  id: string
  type: SecureDataType
  name: string
  data: string // Encrypted data
  createdAt: string
  updatedAt: string
}

export type CreateSecureDataInput = Omit<SecureData, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateSecureDataInput = Partial<CreateSecureDataInput>
