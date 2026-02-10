export enum FinanceStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Account {
  _id?: string
  privateKey?: string
  seedPhrase?: string
  address?: string
  name?: string
}

export interface Finance {
  _id?: string
  createdAt: string | Date
  usdAmount: number
  vndAmount: number
  status: FinanceStatus
}

export interface User {
  _id?: string
  phone: string
  password?: string
  name: string
}

export interface BaseApiResponse<T> {
  data: T
  messages: string
  error?: any
}
