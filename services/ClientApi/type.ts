export enum FinanceStatus {
  Deposit = 'Deposit',
  Withdraw = 'Withdraw',
}

export interface Account {
  _id?: string
  privateKey?: string
  seedPhrase?: string
  address?: string
  name?: string
}

export interface AccountCloud {
  _id?: string
  nameApp?: string
  userName: string
  password: string
  pinCode?: string
  stk?: string
  pinCodeBackup?: string
  type?: string
}

export interface Finance {
  _id?: string
  createdAt: string | Date
  usdAmount: number
  vndAmount: number
  status: FinanceStatus
}

export interface BaseApiResponse<T> {
  data: T
  messages: string
  error?: any
}
