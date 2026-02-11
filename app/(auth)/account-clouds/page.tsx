'use client'

import React, { useEffect, useState } from 'react'

import AccountCloudForm from './Component/AccountCloudForm'
import AccountCloudCard from './Component/TableMobile'
import TableDesktop from './Component/TableDesktop'

import { PlusIcon } from '@/components/Icons/Plus'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import useModal from '@/hooks/useModal'
import useAccountCloud from '@/hooks/react-query/useAccountCloud'
import useQuerySearch from '@/hooks/react-query/useQuerySearch'
import AccountCloudAPI from '@/services/API/AccountCloud'
import { AccountCloud } from '@/services/ClientApi/type'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'

type AccountCloudSearchParams = {
  page?: number
  limit?: number
  nameApp?: string
  userName?: string
  type?: string
}

const AccountCloudsPage = () => {
  const { query: params, updateQuery } = useQuerySearch<AccountCloudSearchParams>()
  const { data, isLoading, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, pagination } = useAccountCloud(params)
  const { openModal, closeModal } = useModal()
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const nameAppQuery = (params?.nameApp as string) || ''
  const [search, setSearch] = useState<string>(nameAppQuery)

  useEffect(() => {
    setSearch(nameAppQuery)
  }, [nameAppQuery])

  useEffect(() => {
    if (search === nameAppQuery) {
      return
    }
    const t = setTimeout(() => {
      updateQuery('nameApp', search)
    }, 400)

    return () => clearTimeout(t)
  }, [search, nameAppQuery, updateQuery])

  const handleDelete = async (id: string) => {
    if (confirm(translate('accountClouds.confirmDelete'))) {
      setIsDeleting(true)
      try {
        await AccountCloudAPI.delete(id)
        showNotificationSuccess(translate('accountClouds.deleteSuccess'))
        refetch()
      } catch {
        showNotificationError(translate('accountClouds.deleteError'))
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleOpenModal = (account?: AccountCloud) => {
    openModal({
      title: account ? translate('accountClouds.editAccount') : translate('accountClouds.addAccount'),
      children: <AccountCloudForm account={account} refetch={refetch} onSuccess={closeModal} />,
    })
  }

  const renderMobile = () => {
    return (
      <div className='block  space-y-4'>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='p-4 rounded-xl border dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-lg animate-pulse'>
              <div className='h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4' />
              <div className='space-y-2'>
                <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-full' />
                <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3' />
              </div>
            </div>
          ))
        ) : data && data.length > 0 ? (
          data.map((item) => <AccountCloudCard key={item._id} isDeleting={isDeleting} item={item} onDelete={handleDelete} onEdit={handleOpenModal} />)
        ) : (
          <div className='text-center p-8 text-gray-500 dark:text-gray-400 italic'>{translate('accountClouds.noAccounts')}</div>
        )}
      </div>
    )
  }

  const renderDesktop = () => {
    return <TableDesktop data={data || []} isDeleting={isDeleting} isLoading={isLoading} onDelete={handleDelete} onEdit={handleOpenModal} />
  }

  const renderLoadMore = () => {
    if (!pagination || pagination.totalPages <= 1) {
      return null
    }

    if (!hasNextPage) {
      return (
        <div className='flex items-center justify-center mt-6 text-sm text-gray-500 dark:text-slate-400'>
          {translate('common.pagination', { page: pagination.page, totalPages: pagination.totalPages }, `Page ${pagination.page} / ${pagination.totalPages}`)}
        </div>
      )
    }

    return (
      <div className='flex items-center justify-between mt-6 gap-3'>
        <div className='text-sm text-gray-500 dark:text-slate-400'>
          {translate('common.pagination', { page: pagination.page, totalPages: pagination.totalPages }, `Page ${pagination.page} / ${pagination.totalPages}`)}
        </div>
        <MyButton
          className='rounded-xl'
          color='primary'
          variant='flat'
          isLoading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {translate('common.loadMore', {}, 'Load more')}
        </MyButton>
      </div>
    )
  }

  return (
    <div className='container p-6 mx-auto mt-24 animate-slide-up font-sans'>
      <div className='flex items-center justify-between mb-10'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-bold dark:text-white tracking-tight'>{translate('accountClouds.title')}</h1>
          <p className='text-sm text-gray-500 dark:text-slate-400'>
            {translate('accountClouds.subtitle') || 'Manage your cloud app accounts securely'}
          </p>
        </div>
        <MyButton
          className='rounded-2xl font-bold px-8 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all'
          color='primary'
          startContent={<PlusIcon className='size-5' />}
          onClick={() => handleOpenModal()}
        >
          {translate('accountClouds.addNew')}
        </MyButton>
      </div>
      <div className='mb-6'>
        <MyInput
          label={translate('common.search')}
          placeholder={translate('secureData.searchPlaceholder', {}, 'Search...')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isMobile ? (
        <>
          {renderMobile()}
          {renderLoadMore()}
        </>
      ) : (
        <>
          {renderDesktop()}
          {renderLoadMore()}
        </>
      )}
    </div>
  )
}

export default AccountCloudsPage
