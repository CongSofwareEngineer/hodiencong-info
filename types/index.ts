// import { ValidationErrors } from '@react-types/shared'
import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

// export type ErrorForm = ValidationErrors
export type ErrorForm<T> = Partial<Record<keyof T, string>>

export interface UserAddress {
  _id?: string
  address: string
  isDefault?: boolean
  label?: string
}

export interface User {
  _id?: string
  phone: string
  password?: string
  name: string
  avatar?: string
  points?: number
  addresses?: UserAddress[]

  token?: string
  TokenRefresh?: string
  id?: string
  email?: string
  sdt?: string
  address?: string
  startTime?: string
  endTime?: string
  linkAddress?: string
  info?: {
    face?: string
    zalo?: string
    tiktok?: string
    instagram?: string
    linkedin?: string
    youtube?: string
    [key: string]: unknown
  }
}

export interface Query {
  queryKey: any[]
  pageParam: number
}
