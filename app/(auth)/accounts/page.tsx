'use client'

import React, { useEffect, useState } from 'react'

import AccountForm from './Component/AccountForm'
import AccountCard from './Component/TableMobile'
import TableDesktop from './Component/TableDesktop'

import { PlusIcon } from '@/components/Icons/Plus'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import useAccount from '@/hooks/react-query/useAccount'
import useModal from '@/hooks/useModal'
import { Account } from '@/services/ClientApi/type'
import AccountAPI from '@/services/API/Account'
import useLanguage from '@/hooks/useLanguage'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import useQuerySearch from '@/hooks/react-query/useQuerySearch'
import useMedia from '@/hooks/useMedia'

type AccountSearchParams = {
  page?: number
  limit?: number
  name?: string
}
const AccountsPage = () => {
  const { query: params, updateQuery } = useQuerySearch<AccountSearchParams>()
  const { data, isLoading, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, pagination } = useAccount(params)
  const { openModal, closeModal } = useModal()
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const nameQuery = (params?.name as string) || ''
  const [search, setSearch] = useState<string>(nameQuery)

  useEffect(() => {
    setSearch(nameQuery)
  }, [nameQuery])

  useEffect(() => {
    if (search === nameQuery) {
      return
    }
    const t = setTimeout(() => {
      updateQuery('name', search)
    }, 400)

    return () => clearTimeout(t)
  }, [search, nameQuery, updateQuery])

  const handleDelete = async (id: string) => {
    if (confirm(translate('accounts.confirmDelete'))) {
      setIsDeleting(true)
      try {
        await AccountAPI.delete(id)
        showNotificationSuccess(translate('accounts.deleteSuccess'))
        refetch()
      } catch {
        showNotificationError(translate('accounts.deleteError'))
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleOpenModal = (account?: Account) => {
    openModal({
      title: account ? translate('accounts.editAccount') : translate('accounts.addAccount'),
      children: <AccountForm account={account} refetch={refetch} onSuccess={closeModal} />,
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
          data.map((item) => <AccountCard key={item._id} isDeleting={isDeleting} item={item} onDelete={handleDelete} onEdit={handleOpenModal} />)
        ) : (
          <div className='text-center p-8 text-gray-500 dark:text-gray-400 italic'>{translate('accounts.noAccounts')}</div>
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
          {translate(
            'common.pagination',
            { page: pagination.page, totalPages: pagination.totalPages },
            `Page ${pagination.page} / ${pagination.totalPages}`
          )}
        </div>
      )
    }

    return (
      <div className='flex items-center justify-between mt-6 gap-3'>
        <div className='text-sm text-gray-500 dark:text-slate-400'>
          {translate(
            'common.pagination',
            { page: pagination.page, totalPages: pagination.totalPages },
            `Page ${pagination.page} / ${pagination.totalPages}`
          )}
        </div>
        <MyButton className='rounded-xl' color='primary' isLoading={isFetchingNextPage} variant='flat' onClick={() => fetchNextPage()}>
          {translate('common.loadMore', {}, 'Load more')}
        </MyButton>
      </div>
    )
  }

  return (
    <div className='container p-6 mx-auto  animate-slide-up font-sans'>
      <div className='flex items-center justify-between mb-10'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-bold dark:text-white tracking-tight'>{translate('accounts.title')}</h1>
          <p className='text-sm text-gray-500 dark:text-slate-400'>
            {translate('accounts.subtitle') || 'Securely manage your connected wallets and accounts'}
          </p>
        </div>
        <MyButton
          className='rounded-2xl font-bold px-8 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all'
          color='primary'
          startContent={<PlusIcon className='size-5' />}
          onClick={() => handleOpenModal()}
        >
          {translate('accounts.addNew')}
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

export default AccountsPage
