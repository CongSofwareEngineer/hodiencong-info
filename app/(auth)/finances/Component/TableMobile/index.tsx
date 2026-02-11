import React from 'react'

import { EditIcon } from '@/components/Icons/Edit'
import { TrashIcon } from '@/components/Icons/Trash'
import MyButton from '@/components/MyButton'
import { STATUS_FINANCE } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import { Finance } from '@/services/ClientApi/type'
import { numberWithCommas } from '@/utils/functions'
import { cn } from '@/utils/tailwind'

const FinanceCard = ({
  item,
  onEdit,
  onDelete,
  isDeleting,
}: {
  item: Finance
  onEdit: (finance: Finance) => void
  onDelete: (id: string) => void
  isDeleting: boolean
}) => {
  const { translate } = useLanguage()

  const statusColors: Record<string, string> = {
    [STATUS_FINANCE.Deposit]: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20',
    [STATUS_FINANCE.Withdraw]: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20',
  }

  return (
    <div className='p-4 rounded-xl border dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-lg flex flex-col gap-4'>
      <div className='flex justify-between items-start gap-3'>
        <div className='space-y-2'>
          <div className='space-y-1'>
            <span className='text-xs font-semibold text-gray-500 uppercase'>{translate('finances.date')}</span>
            <div className='font-semibold dark:text-white'>{new Date(item.createdAt).toLocaleDateString()}</div>
          </div>
          <span
            className={cn(
              'inline-flex w-fit px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider',
              statusColors[item.status] || 'text-gray-500 bg-gray-100 dark:bg-slate-800'
            )}
          >
            {item.status}
          </span>
        </div>

        <div className='flex gap-2'>
          <MyButton isIconOnly className='rounded-lg w-8 min-h-max min-w-8' color='warning' size='sm' variant='flat' onClick={() => onEdit(item)}>
            <EditIcon className='size-4' />
          </MyButton>
          <MyButton
            isIconOnly
            className='rounded-lg w-8 min-h-max min-w-8'
            color='danger'
            isLoading={isDeleting}
            size='sm'
            variant='flat'
            onClick={() => onDelete(item._id!)}
          >
            <TrashIcon className='size-4' />
          </MyButton>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <div className='bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg'>
          <div className='text-xs font-semibold text-gray-500 uppercase'>{translate('finances.usdAmount')}</div>
          <div className='font-mono font-bold text-blue-600 dark:text-blue-400 mt-1'>${numberWithCommas(item.usdAmount)}</div>
        </div>
        <div className='bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg'>
          <div className='text-xs font-semibold text-gray-500 uppercase'>{translate('finances.vndAmount')}</div>
          <div className='font-mono text-green-600 dark:text-green-400 mt-1'>{numberWithCommas(`${item.vndAmount}000`)} VND</div>
        </div>
      </div>
    </div>
  )
}

export default FinanceCard

