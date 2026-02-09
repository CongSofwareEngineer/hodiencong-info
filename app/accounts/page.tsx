'use client'

import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { EditIcon } from '@/components/Icons/Edit'
import { TrashIcon } from '@/components/Icons/Trash'
import { PlusIcon } from '@/components/Icons/Plus'
import useGetAccount from '@/hooks/react-query/useAccount'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import useModal from '@/hooks/useModal'
import { Account } from '@/services/ClientApi/type'
import AccountAPI from '@/services/API/Account'
import useLanguage from '@/hooks/useLanguage'
import { copyToClipboard, showNotificationError, showNotificationSuccess } from '@/utils/notification'
import useQuerySearch from '@/hooks/react-query/useQuerySearch'
import MyTable from '@/components/MyTable'
import { ellipsisText } from '@/utils/functions'
import { CopyIcon } from '@/components/Icons/Copy'

type AccountSearchParams = {
  page?: number
  limit?: number
  name?: string
}
const AccountsPage = () => {
  const { query: params } = useQuerySearch<AccountSearchParams>()
  const { data, isLoading, refetch } = useGetAccount(params)
  const { openModal, closeModal } = useModal()
  const { translate } = useLanguage()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm(translate('accounts.confirmDelete'))) {
      setIsDeleting(id)
      try {
        await AccountAPI.delete(id)
        showNotificationSuccess(translate('accounts.deleteSuccess'))
        refetch()
      } catch {
        showNotificationError(translate('accounts.deleteError'))
      } finally {
        setIsDeleting(null)
      }
    }
  }

  const handleOpenModal = (account?: Account) => {
    openModal({
      title: account ? translate('accounts.editAccount') : translate('accounts.addAccount'),
      children: <AccountForm account={account} refetch={refetch} onSuccess={closeModal} />,
    })
  }

  const columns = [
    {
      header: translate('accounts.name'),
      key: 'name',
      className: 'font-medium',
      render: (item: Account) => (
        <div className='truncate max-w-[300px] font-mono ' title={item.address}>
          {item?.name || ellipsisText(item.address || '')}
        </div>
      ),
    },
    {
      header: translate('accounts.address'),
      key: 'address',
      render: (item: Account) => (
        <div className='truncate max-w-[300px] font-mono ' title={item.address}>
          <span className='flex items-center gap-2'>
            <span>{ellipsisText(item.address || '')}</span>
            <CopyIcon className='size-4 cursor-pointer' onClick={() => copyToClipboard(item.address || '')} />
          </span>
        </div>
      ),
    },
    {
      header: translate('accounts.privateKey'),
      key: 'privateKey',
      render: (item: Account) => (
        <div className='truncate max-w-[300px] font-mono ' title={item.privateKey}>
          {item.privateKey && (
            <span className='flex items-center gap-2'>
              <span>{ellipsisText(item.privateKey)}</span>
              <CopyIcon className='size-4 cursor-pointer' onClick={() => copyToClipboard(item.privateKey || '')} />
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Seed Phrase',
      key: 'seedPhrase',
      render: (item: Account) => (
        <div className='truncate max-w-[300px] font-mono ' title={item.privateKey}>
          {item.seedPhrase && (
            <span className='flex items-center gap-2'>
              <span>{ellipsisText(item.seedPhrase)}</span>
              <CopyIcon className='size-4 cursor-pointer' onClick={() => copyToClipboard(item.seedPhrase || '')} />
            </span>
          )}
        </div>
      ),
    },
    {
      header: translate('accounts.actions'),
      key: 'actions',
      className: 'text-right',
      render: (item: Account) => (
        <div className='flex justify-end space-x-3 gap-6'>
          <MyButton
            isIconOnly
            className='rounded-xl hover:scale-110 transition-transform'
            color='warning'
            size='sm'
            variant='flat'
            onClick={() => handleOpenModal(item)}
          >
            <EditIcon className='size-5' />
          </MyButton>
          <MyButton
            isIconOnly
            className='rounded-xl hover:scale-110 transition-transform'
            color='danger'
            isLoading={isDeleting === item._id}
            size='sm'
            variant='flat'
            onClick={() => handleDelete(item._id!)}
          >
            <TrashIcon className='size-5' />
          </MyButton>
        </div>
      ),
    },
  ]

  return (
    <div className='container p-6 mx-auto mt-24 animate-slide-up'>
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

      <MyTable
        columns={columns}
        data={data || []}
        isLoading={isLoading}
        loadingMessage={translate('accounts.loading')}
        noDataMessage={translate('accounts.noAccounts')}
      />
    </div>
  )
}

const AccountForm = ({ account, onSuccess, refetch }: { account?: Account; onSuccess: () => void; refetch: () => void }) => {
  const [formData, setFormData] = useState<Partial<Account>>(account || {})
  const { translate } = useLanguage()

  const createMutation = useMutation({
    mutationFn: (body: any) => AccountAPI.create(body),
    onSuccess: () => {
      showNotificationSuccess(translate('accounts.addSuccess'))
      refetch()
      onSuccess()
    },
    onError: () => {
      showNotificationError(translate('accounts.addError'))
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) => AccountAPI.update(id, body),
    onSuccess: () => {
      showNotificationSuccess(translate('accounts.updateSuccess'))
      refetch()
      onSuccess()
    },
    onError: () => {
      showNotificationError(translate('accounts.updateError'))
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mutation = account ? updateMutation : createMutation
    const payload = account ? { id: account._id!, body: formData } : formData

    mutation.mutate(payload as any)
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <MyInput label={translate('accounts.name')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <MyInput
        label={translate('accounts.address')}
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <MyInput
        label={translate('accounts.privateKey')}
        value={formData.privateKey}
        onChange={(e) => setFormData({ ...formData, privateKey: e.target.value })}
      />
      <MyButton className='w-full' color='primary' isLoading={createMutation.isPending || updateMutation.isPending} type='submit'>
        {translate('common.save')}
      </MyButton>
    </form>
  )
}

export default AccountsPage
