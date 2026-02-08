'use client'

import { useState } from 'react'
import { Input } from '@heroui/input'
import { Eye, EyeOff, Lock, Copy, Check } from 'lucide-react'

import MyButton from '@/components/MyButton'
import SecureApi from '@/services/SecureApi'
import { copyToClipboard } from '@/utils/notification'

interface DecodeModalProps {
  encryptedData: string
  name: string
  onClose: () => void
}

const DecodeModal = ({ encryptedData, name, onClose }: DecodeModalProps) => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    <div className='p-4 space-y-6'>
      <div className='flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl'>
        <Lock className='w-5 h-5 text-blue-400' />
        <span className='text-sm text-gray-300'>
          Decoding: <span className='text-white font-medium'>{name}</span>
        </span>
      </div>

      {!decryptedData ? (
        <div className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-400 ml-1'>Enter Password</label>
            <Input
              classNames={{
                inputWrapper: 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50 focus-within:!border-blue-500',
              }}
              endContent={
                <button className='text-gray-400 hover:text-white transition-colors' type='button' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
              placeholder='Enter your security password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className='text-sm text-red-400 ml-1'>{error}</p>}

          <MyButton className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12' isLoading={isLoading} onClick={handleDecode}>
            Decrypt Data
          </MyButton>
        </div>
      ) : (
        <div className='space-y-4'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between ml-1'>
              <label className='text-sm font-medium text-green-400'>Decrypted Content</label>
              <button className='flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors' onClick={handleCopy}>
                {isCopied ? (
                  <>
                    <Check size={14} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy
                  </>
                )}
              </button>
            </div>
            <div className='bg-gray-900/80 border border-gray-700 rounded-xl p-4 font-mono text-sm text-white break-all whitespace-pre-wrap max-h-[300px] overflow-y-auto custom-scrollbar shadow-inner'>
              {decryptedData}
            </div>
          </div>
          <MyButton className='w-full bg-gray-800 hover:bg-gray-700 text-white font-medium h-11' onClick={onClose}>
            Close
          </MyButton>
        </div>
      )}
    </div>
  )
}

export default DecodeModal
