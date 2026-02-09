'use client'

import { useState } from 'react'
import { Input, Textarea } from '@heroui/input'
import { Key, Shield, Lock, Eye, EyeOff } from 'lucide-react'

import MyButton from '@/components/MyButton'
import { SecureData, SecureDataType } from '@/types/secure'
import SecureApi from '@/services/SecureApi'
import { showNotificationError } from '@/utils/notification'
import useLanguage from '@/hooks/useLanguage'

interface SecureDataFormProps {
  type: SecureDataType
  initialData?: SecureData
  onSubmit: (data: { name: string; data: string }) => void
  isLoading?: boolean
}

const SecureDataForm = ({ type, initialData, onSubmit, isLoading }: SecureDataFormProps) => {
  const [name, setName] = useState(initialData?.name || '')
  const [rawData, setRawData] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isEncrypting, setIsEncrypting] = useState(false)
  const { translate } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || (!initialData && !rawData) || !password) {
      showNotificationError(translate('secureData.errors.fillAllFields'))

      return
    }

    try {
      setIsEncrypting(true)
      // Encrypt the data before sending to backend
      const result = await SecureApi.encrypt(rawData || initialData?.data || '', password)

      if (result.error) {
        showNotificationError(translate('secureData.errors.encryptionFailed'))

        return
      }

      onSubmit({
        name,
        data: result.data,
      })
    } catch {
      showNotificationError(translate('secureData.errors.encryptionFailed'))
    } finally {
      setIsEncrypting(false)
    }
  }

  const getPlaceholder = () => {
    switch (type) {
      case SecureDataType.PRIVATE_KEY:
        return translate('secureData.form.secretDataPlaceholder.privateKey')
      case SecureDataType.SEED_PHRASE:
        return translate('secureData.form.secretDataPlaceholder.seedPhrase')
      case SecureDataType.PASSWORD:
        return translate('secureData.form.secretDataPlaceholder.password')
      default:
        return translate('secureData.form.secretDataPlaceholder.default')
    }
  }

  const getIcon = () => {
    switch (type) {
      case SecureDataType.PRIVATE_KEY:
        return <Key className='text-blue-400' size={20} />
      case SecureDataType.SEED_PHRASE:
        return <Shield className='text-green-400' size={20} />
      default:
        return <Lock className='text-purple-400' size={20} />
    }
  }

  return (
    <form className='space-y-5 p-2' onSubmit={handleSubmit}>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-400 ml-1'>{translate('secureData.form.label')}</label>
        <Input
          classNames={{
            inputWrapper: 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50 focus-within:!border-blue-500',
          }}
          placeholder={translate('secureData.form.labelPlaceholder')}
          startContent={getIcon()}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-400 ml-1'>{translate('secureData.form.secretData')}</label>
        <Textarea
          classNames={{
            inputWrapper: 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50 focus-within:!border-blue-500',
          }}
          minRows={3}
          placeholder={getPlaceholder()}
          value={rawData}
          onChange={(e) => setRawData(e.target.value)}
        />
        <p className='text-[10px] text-gray-500 ml-1'>{translate('secureData.form.encryptionNotice')}</p>
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-400 ml-1'>{translate('secureData.form.securityPassword')}</label>
        <Input
          classNames={{
            inputWrapper: 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50 focus-within:!border-blue-500',
          }}
          endContent={
            <button className='text-gray-400 hover:text-white transition-colors' type='button' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
          placeholder={translate('secureData.form.securityPasswordPlaceholder')}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='text-[10px] text-yellow-500/70 ml-1'>{translate('secureData.form.securityPasswordWarning')}</p>
      </div>

      <div className='pt-4 pb-2'>
        <MyButton
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 shadow-lg shadow-blue-500/20'
          isLoading={isLoading || isEncrypting}
          type='submit'
        >
          {initialData ? translate('secureData.form.update') : translate('secureData.form.submit')}
        </MyButton>
      </div>
    </form>
  )
}

export default SecureDataForm
