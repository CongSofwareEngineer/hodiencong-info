'use client'

import { SecureData, SecureDataType } from '@/types/secure'
import SecureDataTable from './SecureDataTable'

interface PrivateKeyTabProps {
  searchQuery: string
  onEdit: (item: SecureData) => void
  onDecode: (item: SecureData) => void
}

const PrivateKeyTab = (props: PrivateKeyTabProps) => {
  return <SecureDataTable type={SecureDataType.PRIVATE_KEY} {...props} />
}

export default PrivateKeyTab
