'use client'

import { Trash2, Edit2, Eye, MoreVertical, Shield, Lock, Key } from 'lucide-react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown'

import MyButton from '@/components/MyButton'
import { SecureData, SecureDataType } from '@/types/secure'
import { useGetSecureData, useDeleteSecureData } from '@/hooks/useSecureData'

interface SecureDataTableProps {
  type: SecureDataType
  searchQuery: string
  onEdit: (item: SecureData) => void
  onDecode: (item: SecureData) => void
}

const SecureDataTable = ({ type, searchQuery, onEdit, onDecode }: SecureDataTableProps) => {
  const { data: secureDataResponse, isLoading } = useGetSecureData(type)
  const deleteMutation = useDeleteSecureData()

  const listItems = secureDataResponse?.data || []
  const filteredItems = listItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      deleteMutation.mutate(id)
    }
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

  return (
    <div className='bg-gray-900/30 backdrop-blur-sm rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl'>
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='border-b border-gray-800/50 bg-gray-800/60'>
              <th className='px-6 py-5 text-xs font-bold text-gray-300 uppercase tracking-widest'>Label</th>
              <th className='px-6 py-5 text-xs font-bold text-gray-300 uppercase tracking-widest'>Type</th>
              <th className='px-6 py-5 text-xs font-bold text-gray-300 uppercase tracking-widest'>Data Snippet</th>
              <th className='px-6 py-5 text-xs font-bold text-gray-300 uppercase tracking-widest'>Created At</th>
              <th className='px-6 py-5 text-xs font-bold text-gray-300 uppercase tracking-widest text-right'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-800/50'>
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className='animate-pulse'>
                  <td className='px-6 py-8' colSpan={5}>
                    <div className='h-4 bg-gray-800 rounded w-full' />
                  </td>
                </tr>
              ))
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.id} className='group hover:bg-white/[0.03] transition-colors'>
                  <td className='px-6 py-5'>
                    <div className='flex items-center gap-3'>
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          item.type === SecureDataType.PRIVATE_KEY
                            ? 'bg-blue-500/10'
                            : item.type === SecureDataType.SEED_PHRASE
                              ? 'bg-green-500/10'
                              : 'bg-purple-500/10'
                        }`}
                      >
                        {getTabIcon(item.type, false)}
                      </div>
                      <span className='font-medium text-gray-200 group-hover:text-white transition-colors'>{item.name}</span>
                    </div>
                  </td>
                  <td className='px-6 py-5'>
                    <span className='px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-tight bg-gray-800 text-gray-400 border border-gray-700'>
                      {getTabLabel(item.type)}
                    </span>
                  </td>
                  <td className='px-6 py-5'>
                    <code className='text-xs text-gray-500 font-mono italic opacity-60 group-hover:opacity-100 transition-opacity'>
                      {item.data.substring(0, 15)}...
                    </code>
                  </td>
                  <td className='px-6 py-5 text-sm text-gray-500'>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className='px-6 py-5 text-right'>
                    <div className='flex items-center justify-end gap-2'>
                      <MyButton
                        isIconOnly
                        className='text-blue-400 hover:bg-blue-500/10 transition-colors'
                        size='sm'
                        title='Decode'
                        variant='light'
                        onClick={() => onDecode(item)}
                      >
                        <Eye size={18} />
                      </MyButton>

                      <Dropdown placement='bottom-end'>
                        <DropdownTrigger>
                          <MyButton isIconOnly className='text-gray-500 hover:text-white transition-colors' size='sm' variant='light'>
                            <MoreVertical size={18} />
                          </MyButton>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label='Vault actions'
                          className='bg-gray-900 border border-gray-800 rounded-xl p-1 shadow-2xl'
                          itemClasses={{
                            base: 'rounded-lg transition-colors',
                          }}
                        >
                          <DropdownItem
                            key='edit'
                            className='text-gray-300 hover:text-white'
                            startContent={<Edit2 size={16} />}
                            onClick={() => onEdit(item)}
                          >
                            Edit Label
                          </DropdownItem>
                          <DropdownItem
                            key='delete'
                            className='text-danger hover:bg-danger-500/10'
                            startContent={<Trash2 size={16} />}
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete Permanently
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className='px-6 py-20 text-center' colSpan={5}>
                  <div className='flex flex-col items-center gap-4'>
                    <div className='w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800'>
                      <Lock className='text-gray-600' size={32} />
                    </div>
                    <div>
                      <p className='text-xl font-semibold text-gray-400'>No {getTabLabel(type)} found</p>
                      <p className='text-gray-600 text-sm'>Try adjusting your search or add a new entry.</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SecureDataTable
