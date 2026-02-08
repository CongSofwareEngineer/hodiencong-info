'use client'

import { SecureData, SecureDataType } from '@/types/secure'
import SecureDataTable from './SecureDataTable'

interface SeedPhraseTabProps {
  searchQuery: string
  onEdit: (item: SecureData) => void
  onDecode: (item: SecureData) => void
}

const SeedPhraseTab = (props: SeedPhraseTabProps) => {
  return <SecureDataTable type={SecureDataType.SEED_PHRASE} {...props} />
}

export default SeedPhraseTab
