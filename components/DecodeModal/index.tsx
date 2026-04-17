'use client'

import { useState } from 'react'
import { Lock, Copy, Check } from 'lucide-react'

import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import SecureApi from '@/services/SecureApi'
import { copyToClipboard } from '@/utils/notification'

import { cn } from '@/utils/tailwind'

interface DecodeModalProps {
  encryptedData: string
  name: string
  onClose: () => void
}

const DecodeModal = ({ encryptedData, name, onClose }: DecodeModalProps) => {
  const [password, setPassword] = useState('')
  const [decryptedData, setDecryptedData] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const handleDecode = async () => {
    try {
      setIsLoading(true)
      setError('')
      const result = await SecureApi.decrypt(encryptedData, password)

      if (result.error || !result.data) {
        setError('Incorrect password or invalid data')

        return
      }

      setDecryptedData(result.data)
    } catch (err) {
      setError('Failed to decrypt data')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    copyToClipboard(decryptedData)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className='p-4 space-y-5'>
      {/* Info banner */}
      <div
        className={cn(
          'flex items-center gap-3 p-3 rounded-[6px]',
          'bg-blue-50 border border-blue-200 text-blue-700',
          'dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300'
        )}
      >
        <Lock className='w-4 h-4 shrink-0' />
        <span className='text-sm'>
          Decoding: <span className='font-semibold'>{name}</span>
        </span>
      </div>

      {!decryptedData ? (
        <div className='space-y-4'>
          {/* Password input */}
          <MyInput
            label='Password'
            placeholder='Enter your security password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e)}
          />

          {error && (
            <p className={cn(
              'text-sm px-3 py-2 rounded-[6px]',
              'bg-red-50 border border-red-200 text-red-600',
              'dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
            )}>
              {error}
            </p>
          )}

          <MyButton
            className='w-full'
            color='primary'
            isLoading={isLoading}
            onClick={handleDecode}
          >
            Decrypt Data
          </MyButton>
        </div>
      ) : (
        <div className='space-y-4'>
          {/* Result header */}
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-green-600 dark:text-green-400'>
              Decrypted Content
            </span>
            <button
              className={cn(
                'flex items-center gap-1.5 text-xs rounded-[4px] px-2 py-1 transition-colors',
                'text-gray-500 hover:text-gray-900 hover:bg-gray-100',
                'dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700'
              )}
              onClick={handleCopy}
            >
              {isCopied ? (
                <>
                  <Check size={13} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={13} />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Result content */}
          <div
            className={cn(
              'p-4 rounded-[6px] border font-mono text-sm break-all whitespace-pre-wrap max-h-[300px] overflow-y-auto',
              'bg-gray-50 border-gray-200 text-gray-800',
              'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100'
            )}
          >
            {decryptedData}
          </div>

          <MyButton className='w-full' color='secondary' onClick={onClose}>
            Close
          </MyButton>
        </div>
      )}
    </div>
  )
}

export default DecodeModal
