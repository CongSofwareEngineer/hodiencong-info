'use client'

import React, { useEffect, useState } from 'react'

import FinanceCard from './Component/TableMobile'
import TableDesktop from './Component/TableDesktop'

import { PlusIcon } from '@/components/Icons/Plus'
import useFinance from '@/hooks/react-query/useFinance'
import useGetFinanceRemaining from '@/hooks/react-query/useFinanceRemaining'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MySelect from '@/components/MySelect'
import useModal from '@/hooks/useModal'
import { Finance, FinanceStatus } from '@/services/ClientApi/type'
import FinanceAPI from '@/services/API/Finance'
import useLanguage from '@/hooks/useLanguage'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import useQuerySearch from '@/hooks/react-query/useQuerySearch'
import { cn } from '@/utils/tailwind'
import { numberWithCommas } from '@/utils/functions'
import useMedia from '@/hooks/useMedia'

type FinanceSearchParams = {
  page?: number
  limit?: number
  status?: string
}

const formatUsd = (value: number) => {
  if (!Number.isFinite(value)) return '--'

  return `$${numberWithCommas(value.toFixed(2))}`
}

const SummaryCard = ({
  label,
  value,
  tone = 'neutral',
  isLoading,
}: {
  label: string
  value: string
  tone?: 'neutral' | 'good' | 'bad' | 'focus'
  isLoading?: boolean
}) => {
  const tones = {
    neutral: 'from-slate-50/80 to-white dark:from-slate-900/50 dark:to-slate-900/20 border-slate-200/70 dark:border-slate-800/70',
    good: 'from-emerald-50/80 to-white dark:from-emerald-950/25 dark:to-slate-900/20 border-emerald-200/60 dark:border-emerald-900/50',
    bad: 'from-rose-50/80 to-white dark:from-rose-950/25 dark:to-slate-900/20 border-rose-200/60 dark:border-rose-900/50',
    focus: 'from-amber-50/80 to-white dark:from-amber-950/25 dark:to-slate-900/20 border-amber-200/60 dark:border-amber-900/50',
  } as const

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border bg-gradient-to-b p-5 shadow-sm', tones[tone])}>
      <div className='absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,#000_0,transparent_55%)]' />
      <div className='relative'>
        <div className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>{label}</div>
        <div className='mt-2 font-mono text-2xl font-extrabold text-slate-900 dark:text-white'>
          {isLoading ? <span className='inline-block h-8 w-36 animate-pulse rounded-lg bg-slate-200/70 dark:bg-slate-800/70' /> : value}
        </div>
      </div>
    </div>
  )
}

const FinancesPage = () => {
  const { query, updateQuery } = useQuerySearch<FinanceSearchParams>()
  const { data, isLoading, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, pagination } = useFinance(query)
  const { data: remaining, isLoading: isLoadingRemaining, isError: isErrorRemaining } = useGetFinanceRemaining()
  const { openModal, closeModal } = useModal()
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const statusQuery = (query?.status as string) || ''
  const [search, setSearch] = useState<string>(statusQuery)

  useEffect(() => {
    setSearch(statusQuery)
  }, [statusQuery])

  useEffect(() => {
    if (search === statusQuery) {
      return
    }
    const t = setTimeout(() => {
      updateQuery('status', search)
    }, 400)

    return () => clearTimeout(t)
  }, [search, statusQuery, updateQuery])

  const handleDelete = async (id: string) => {
    if (confirm(translate('finances.confirmDelete'))) {
      setIsDeleting(true)
      try {
        await FinanceAPI.delete(id)
        showNotificationSuccess(translate('finances.deleteSuccess'))
        refetch()
      } catch {
        showNotificationError(translate('finances.deleteError'))
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleOpenModal = (finance?: Finance) => {
    openModal({
      title: finance ? translate('finances.editFinance') : translate('finances.addFinance'),
      children: <FinanceForm finance={finance} refetch={refetch} onSuccess={closeModal} />,
    })
  }

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
          data.map((item) => <FinanceCard key={item._id} isDeleting={isDeleting} item={item} onDelete={handleDelete} onEdit={handleOpenModal} />)
        ) : (
          <div className='text-center p-8 text-gray-500 dark:text-gray-400 italic'>{translate('finances.noFinances')}</div>
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

      <div className='mb-12'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <SummaryCard
            isLoading={isLoadingRemaining}
            label={translate('finances.usdRemaining', {}, 'USD remaining')}
            tone='focus'
            value={formatUsd(remaining?.usdRemaining ?? 0)}
          />
          <SummaryCard
            isLoading={isLoadingRemaining}
            label={translate('finances.totalDeposit', {}, 'Total deposit')}
            tone='good'
            value={formatUsd(remaining?.totalDeposit ?? 0)}
          />
          <SummaryCard
            isLoading={isLoadingRemaining}
            label={translate('finances.totalWithdraw', {}, 'Total withdraw')}
            tone='bad'
            value={formatUsd(remaining?.totalWithdraw ?? 0)}
          />
        </div>

        {isErrorRemaining ? (
          <div className='mt-3 text-xs text-rose-600 dark:text-rose-400'>{translate('finances.summaryError', {}, 'Could not load summary.')}</div>
        ) : null}
      </div>

      <div className='mb-6'>
        <MyInput
          label={translate('common.search')}
          placeholder={`${translate('finances.status')} (Deposit / Withdraw)`}
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
