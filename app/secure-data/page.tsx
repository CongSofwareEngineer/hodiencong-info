'use client'

import { useState } from 'react'
import { Plus, Search, Shield, Key, Lock } from 'lucide-react'
import { Input } from '@heroui/input'

import PrivateKeyTab from './components/PrivateKeyTab'
import SeedPhraseTab from './components/SeedPhraseTab'
import PasswordTab from './components/PasswordTab'

import MyButton from '@/components/MyButton'
import useModal from '@/hooks/useModal'
import { SecureData, SecureDataType } from '@/types/secure'
import { useCreateSecureData, useUpdateSecureData } from '@/hooks/useSecureData'
import DecodeModal from '@/components/DecodeModal'
import SecureDataForm from '@/components/SecureDataForm'
import useLanguage from '@/hooks/useLanguage'

function SecureDataPage() {
  const [activeTab, setActiveTab] = useState<SecureDataType>(SecureDataType.PRIVATE_KEY)
  const [searchQuery, setSearchQuery] = useState('')
  const { openModal, closeModal } = useModal()
  const { translate } = useLanguage()

  const createMutation = useCreateSecureData()
  const updateMutation = useUpdateSecureData()

  const handleAddData = () => {
    openModal({
      title: translate('secureData.form.modalTitleAdd', { type: getTabLabel(activeTab) }),
      children: (
        <SecureDataForm
          isLoading={createMutation.isPending}
          type={activeTab}
          onSubmit={async (formData) => {
            await createMutation.mutateAsync({
              ...formData,
              type: activeTab,
            })
            closeModal()
          }}
        />
      ),
      size: 'xl',
    })
  }

  const handleEditData = (item: SecureData) => {
    openModal({
      title: `Edit ${item.name}`,
      children: (
        <SecureDataForm
          initialData={item}
          isLoading={updateMutation.isPending}
          type={item.type}
          onSubmit={async (formData) => {
            await updateMutation.mutateAsync({
              id: item.id,
              input: formData,
            })
            closeModal()
          }}
        />
      ),
      size: 'xl',
    })
  }

  const handleDecode = (item: SecureData) => {
    openModal({
      title: 'Decode Secure Data',
      children: <DecodeModal encryptedData={item.data} name={item.name} onClose={() => closeModal()} />,
      size: 'lg',
    })
  }

  function getTabLabel(type: SecureDataType) {
    switch (type) {
      case SecureDataType.PRIVATE_KEY:
        return 'Private Key'
      case SecureDataType.SEED_PHRASE:
        return 'Seed Phrase'
      case SecureDataType.PASSWORD:
        return 'Password'
      default:
        return ''
    }
  }

  function getTabIcon(type: SecureDataType, active: boolean) {
    const size = 20
    const className = active ? 'text-white' : 'text-gray-400'

    switch (type) {
      case SecureDataType.PRIVATE_KEY:
        return <Key className={className} size={size} />
      case SecureDataType.SEED_PHRASE:
        return <Shield className={className} size={size} />
      case SecureDataType.PASSWORD:
        return <Lock className={className} size={size} />
    }
  }

  const renderActiveTab = () => {
    const commonProps = {
      searchQuery,
      onEdit: handleEditData,
      onDecode: handleDecode,
    }

    switch (activeTab) {
      case SecureDataType.PRIVATE_KEY:
        return <PrivateKeyTab {...commonProps} />
      case SecureDataType.SEED_PHRASE:
        return <SeedPhraseTab {...commonProps} />
      case SecureDataType.PASSWORD:
        return <PasswordTab {...commonProps} />
      default:
        return null
    }
  }

  return (
    <div className='pt-28 min-h-screen bg-[#0a0a0c] text-white selection:bg-blue-500/30'>
      <div className='container mx-auto px-6 py-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Header Section */}
          <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10'>
            <div>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20'>
                  <Shield className='text-white' size={24} />
                </div>
                <h1 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400'>Secure Vault</h1>
              </div>
              <p className='text-gray-500 max-w-md'>Manage your sensitive credentials with enterprise-grade encryption and password protection.</p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='relative group'>
                <Search
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors'
                  size={18}
                />
                <Input
                  className='w-full md:w-64'
                  classNames={{
                    inputWrapper: 'bg-gray-900 border-gray-800 hover:border-gray-700 h-11 pl-10',
                  }}
                  placeholder='Search vault...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <MyButton
                className='bg-blue-600 hover:bg-blue-500 text-white font-semibold h-11 px-6 rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2'
                onClick={handleAddData}
              >
                <Plus size={18} />
                <span>Add New</span>
              </MyButton>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className='flex p-1 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-800/50 mb-8 max-w-2xl'>
            {[SecureDataType.PRIVATE_KEY, SecureDataType.SEED_PHRASE, SecureDataType.PASSWORD].map((type) => (
              <button
                key={type}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === type
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-[1.02]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
                }`}
                onClick={() => setActiveTab(type)}
              >
                {getTabIcon(type, activeTab === type)}
                <span className='hidden sm:inline'>{getTabLabel(type)}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          {renderActiveTab()}

          <div className='mt-8 p-6 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl flex items-start gap-4'>
            <div className='p-2 bg-yellow-500/10 rounded-lg'>
              <Lock className='text-yellow-500' size={20} />
            </div>
            <div>
              <h4 className='font-semibold text-yellow-500/90 mb-1'>Local Security Reminder</h4>
              <p className='text-sm text-gray-500 leading-relaxed'>
                Data in this vault is encrypted using your provided passwords. For this demonstration, data is stored locally. Always ensure you
                remember your decryption passwords, as they cannot be recovered if lost.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecureDataPage
