'use client'

import React, { useState } from 'react'

import FinanceCard from './Component/TableMobile'

import { EditIcon } from '@/components/Icons/Edit'
import { TrashIcon } from '@/components/Icons/Trash'
import { PlusIcon } from '@/components/Icons/Plus'
import useGetFinance from '@/hooks/react-query/useFinance'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MySelect from '@/components/MySelect'
import useModal from '@/hooks/useModal'
import { Finance, FinanceStatus } from '@/services/ClientApi/type'
import FinanceAPI from '@/services/API/Finance'
import useLanguage from '@/hooks/useLanguage'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import useQuerySearch from '@/hooks/react-query/useQuerySearch'
import MyTable from '@/components/MyTable'
import { cn } from '@/utils/tailwind'
import { STATUS_FINANCE } from '@/constants/app'
import { numberWithCommas } from '@/utils/functions'
import useMedia from '@/hooks/useMedia'

type FinanceSearchParams = {
  page?: number
  limit?: number
  status?: string
}

const FinancesPage = () => {
  const { query } = useQuerySearch<FinanceSearchParams>()
  const { data, isLoading, refetch } = useGetFinance(query)
  const { openModal, closeModal } = useModal()
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm(translate('finances.confirmDelete'))) {
      setIsDeleting(id)
      try {
        await FinanceAPI.delete(id)
        showNotificationSuccess(translate('finances.deleteSuccess'))
        refetch()
      } catch {
        showNotificationError(translate('finances.deleteError'))
      } finally {
        setIsDeleting(null)
      }
    }
  }

  const handleOpenModal = (finance?: Finance) => {
    openModal({
      title: finance ? translate('finances.editFinance') : translate('finances.addFinance'),
      children: <FinanceForm finance={finance} refetch={refetch} onSuccess={closeModal} />,
    })
  }

  const columns = [
    {
      header: translate('finances.date'),
      key: 'date',
      render: (item: Finance) => <span className='font-medium'>{new Date(item.createdAt).toLocaleDateString()}</span>,
    },
    {
      header: translate('finances.usdAmount'),
      key: 'usdAmount',
      className: 'font-mono font-bold text-blue-600 dark:text-blue-400',
      render: (item: Finance) => `$${numberWithCommas(item.usdAmount)}`,
    },
    {
      header: translate('finances.vndAmount'),
      key: 'vndAmount',
      className: 'font-mono text-green-600 dark:text-green-400',
      render: (item: Finance) => `${numberWithCommas(`${item.vndAmount}000`)} VND`,
    },
    {
      header: translate('finances.status'),
      key: 'status',
      render: (item: Finance) => {
        const statusColors: Record<string, string> = {
          [STATUS_FINANCE.Deposit]: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20',
          [STATUS_FINANCE.Withdraw]: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20',
        }

        return (
          <span
            className={cn(
              'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
              statusColors[item.status] || 'text-gray-500 bg-gray-100 dark:bg-slate-800'
            )}
          >
            {item.status}
          </span>
        )
      },
    },
    {
      header: translate('finances.actions'),
      key: 'actions',
      className: 'text-right',
      render: (item: Finance) => (
        <div className='flex justify-end space-x-3'>
          <MyButton
            isIconOnly
            className='rounded-xl min-h-max hover:scale-110 transition-transform'
            color='warning'
            size='sm'
            variant='flat'
            onClick={() => handleOpenModal(item)}
          >
            <EditIcon className='size-5' />
          </MyButton>
          <MyButton
            isIconOnly
            className='rounded-xl min-h-max hover:scale-110 transition-transform'
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

  const renderMobile = () => {
    return (
      <div className='block space-y-4'>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='p-4 rounded-xl border dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-lg animate-pulse'>
              <div className='flex items-start justify-between gap-3'>
                <div className='w-full'>
                  <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2' />
                  <div className='h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2' />
                  <div className='h-5 bg-slate-200 dark:bg-slate-700 rounded w-24 mt-3' />
                </div>
                <div className='flex gap-2'>
                  <div className='h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg' />
                  <div className='h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg' />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-3 mt-4'>
                <div className='h-16 bg-slate-200 dark:bg-slate-700 rounded-lg' />
                <div className='h-16 bg-slate-200 dark:bg-slate-700 rounded-lg' />
              </div>
            </div>
          ))
        ) : data && data.length > 0 ? (
          data.map((item) => (
            <FinanceCard key={item._id} isDeleting={isDeleting === item._id} item={item} onDelete={handleDelete} onEdit={handleOpenModal} />
          ))
        ) : (
          <div className='text-center p-8 text-gray-500 dark:text-gray-400 italic'>{translate('finances.noFinances')}</div>
        )}
      </div>
    )
  }

  const renderDesktop = () => {
    return (
      <MyTable
        columns={columns}
        data={data || []}
        isLoading={isLoading}
        loadingMessage={translate('finances.loading')}
        noDataMessage={translate('finances.noFinances')}
      />
    )
  }

  return (
    <div className='container p-6 mx-auto mt-24 animate-slide-up font-sans'>
      <div className='flex items-center justify-between mb-10'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-bold dark:text-white tracking-tight'>{translate('finances.title')}</h1>
          <p className='text-sm text-gray-500 dark:text-slate-400'>
            {translate('finances.subtitle') || 'Efficiently track and manage your financial records'}
          </p>
        </div>
        <MyButton
          className='rounded-2xl font-bold px-8 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all'
          color='primary'
          startContent={<PlusIcon className='size-5' />}
          onClick={() => handleOpenModal()}
        >
          {translate('finances.addNew')}
        </MyButton>
      </div>

      {isMobile ? renderMobile() : renderDesktop()}
    </div>
  )
}

const FinanceForm = ({ finance, onSuccess, refetch }: { finance?: Finance; onSuccess: () => void; refetch: () => void }) => {
  const [formData, setFormData] = useState<Partial<Finance>>(finance || { status: FinanceStatus.Deposit })
  const [isLoading, setIsLoading] = useState(false)
  const { translate } = useLanguage()

  const create = async (body: any) => {
    setIsLoading(true)
    try {
      await FinanceAPI.create(body)
      showNotificationSuccess(translate('finances.addSuccess'))
      refetch()
      onSuccess()
    } catch {
      showNotificationError(translate('finances.addError'))
    } finally {
      setIsLoading(false)
    }
  }

  const update = async (body: any) => {
    setIsLoading(true)
    try {
      await FinanceAPI.update(finance?._id!, body)
      showNotificationSuccess(translate('finances.updateSuccess'))
      refetch()
      onSuccess()
    } catch {
      showNotificationError(translate('finances.updateError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (finance) {
      update(formData)
    } else {
      create(formData)
    }
  }

  return (
    <form className='space-y-4 flex flex-col gap-6' onSubmit={handleSubmit}>
      <MyInput
        label={translate('finances.usdAmount')}
        type='number'
        value={formData.usdAmount?.toString()}
        onChange={(e) => setFormData({ ...formData, usdAmount: Number(e.target.value) })}
      />
      <MyInput
        label={translate('finances.vndAmount')}
        type='number'
        value={formData.vndAmount?.toString()}
        onChange={(e) => setFormData({ ...formData, vndAmount: Number(e.target.value) })}
      />
      <MySelect
        label={translate('finances.status')}
        options={Object.values(FinanceStatus).map((status) => ({ key: status, label: status }))}
        selectedKeys={[formData.status || '']}
        onChange={(e) => setFormData({ ...formData, status: e.target.value as FinanceStatus })}
      />
      <MyButton className='w-full' color='primary' isLoading={isLoading} type='submit'>
        {translate('common.save')}
      </MyButton>
    </form>
  )
}

export default FinancesPage
