'use client'

import { SecureData, SecureDataType } from '@/types/secure'
import SecureDataTable from './SecureDataTable'

interface PasswordTabProps {
  searchQuery: string
  onEdit: (item: SecureData) => void
  onDecode: (item: SecureData) => void
}

const PasswordTab = (props: PasswordTabProps) => {
  return <SecureDataTable type={SecureDataType.PASSWORD} {...props} />
}

export default PasswordTab
