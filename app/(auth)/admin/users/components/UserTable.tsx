'use client'

import React, { useState, useMemo } from 'react'

import UserDetail from './UserDetail'

import { SearchIcon } from '@/components/Icons/Functions/Search'
import MyTable from '@/components/MyTable'
import { TrashIcon } from '@/components/Icons/Trash'
import { EyeIcon } from '@/components/Icons/Eye'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import { showNotificationSuccess } from '@/utils/notification'
import useMedia from '@/hooks/useMedia'
import { User } from '@/types'

const ITEMS_PER_PAGE = 5

const UserTable = () => {
  const { translate } = useLanguage()
  const { openModal } = useModal()
  const { isMobile } = useMedia()

  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Nguyễn Văn A', phone: '0901234567', email: 'vana@gmail.com', address: 'Hồ Chí Minh' },
    { id: '2', name: 'Trần Thị B', phone: '0912345678', email: 'thib@gmail.com', address: 'Hà Nội' },
    { id: '3', name: 'Lê Văn C', phone: '0923456789', email: 'vanc@gmail.com', address: 'Đà Nẵng' },
    { id: '4', name: 'Phạm Thị D', phone: '0934567890', email: 'thid@gmail.com', address: 'Cần Thơ' },
    { id: '5', name: 'Hoàng Văn E', phone: '0945678901', email: 'vane@gmail.com', address: 'Hải Phòng' },
    { id: '6', name: 'Đặng Thị F', phone: '0956789012', email: 'thif@gmail.com', address: 'Huế' },
    { id: '7', name: 'Vũ Văn G', phone: '0967890123', email: 'vang@gmail.com', address: 'Bình Dương' },
  ])

  const handleDelete = (id: string) => {
    if (confirm(translate('warning.doYouWantDetele'))) {
      setUsers(users.filter((u) => u.id !== id))
      showNotificationSuccess(translate('common.delete'))
    }
  }

  const handleShowDetail = (user: User) => {
    openModal({
      title: translate('profile.profileInfo'),
      children: <UserDetail user={user} />,
    })
  }

  const filteredUsers = useMemo(() => {
    return users.filter((u) => u.sdt?.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [users, searchQuery])

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredUsers, currentPage])

  const columns = useMemo(() => {
    return [
      { header: translate('profile.name'), key: 'name' },
      { header: translate('profile.sdt'), key: 'sdt' },
      {
        header: translate('common.actions'),
        key: 'actions',
        render: (item: User) => (
          <div className='flex gap-2'>
            <button
              onClick={() => handleShowDetail(item)}
              className='btn btn-square btn-primary btn-sm rounded-xl shadow-md shadow-blue-500/10'
              type='button'
            >
              <EyeIcon className='w-4 h-4' />
            </button>
            <button
              onClick={() => handleDelete(item.id!)}
              className='btn btn-square btn-error btn-sm rounded-xl shadow-md shadow-red-500/10'
              type='button'
            >
              <TrashIcon className='w-4 h-4' />
            </button>
          </div>
        ),
      },
    ]
  }, [translate])

  const renderMobile = () => {
    return (
      <div className='grid grid-cols-1 gap-4'>
        {paginatedUsers.map((item) => (
          <div key={item.id} className='p-5 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold'>
                  {item.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className='font-bold text-gray-900 dark:text-white'>{item.name}</p>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>{item.sdt}</p>
                </div>
              </div>
            </div>

            <div className='flex gap-3 pt-2'>
              <button className='btn btn-primary btn-sm flex-1 rounded-2xl font-bold' onClick={() => handleShowDetail(item)} type='button'>
                {translate('common.view')}
              </button>
              <button className='btn btn-square btn-error btn-sm rounded-2xl shrink-0' onClick={() => handleDelete(item.id!)} type='button'>
                <TrashIcon className='w-4 h-4' />
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div className='w-full md:w-96'>
          <label className='input w-full'>
            <SearchIcon className='size-4 opacity-50' />
            <input
              className='grow'
              placeholder={translate('profile.sdt')}
              type='search'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
          </label>
        </div>
        <p className='text-sm text-gray-500 dark:text-gray-400 font-medium'>
          {translate('common.total')}: <span className='text-blue-600 font-bold'>{filteredUsers.length}</span> {translate('header.user')}
        </p>
      </div>

      {isMobile ? (
        renderMobile()
      ) : (
        <MyTable
          columns={columns as any}
          data={paginatedUsers}
          className='border-none rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none'
        />
      )}

      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 pt-4'>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className='btn btn-primary btn-sm rounded-xl'
            disabled={currentPage === 1}
            type='button'
          >
            {translate('common.previous')}
          </button>
          <div className='flex gap-1'>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110'
                    : 'bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className='btn btn-primary btn-sm rounded-xl'
            disabled={currentPage === totalPages}
            type='button'
          >
            {translate('common.next')}
          </button>
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className='text-center py-20 bg-gray-50/50 dark:bg-gray-800/30 rounded-[40px] border-2 border-dashed border-gray-200 dark:border-gray-700'>
          <div className='w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4'>
            <EyeIcon className='w-10 h-10 text-gray-400' />
          </div>
          <p className='text-gray-500 dark:text-gray-400 font-medium text-lg'>{translate('warning.noData')}</p>
        </div>
      )}
    </div>
  )
}

export default UserTable
