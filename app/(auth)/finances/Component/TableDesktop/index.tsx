import React from 'react'

import { EditIcon } from '@/components/Icons/Edit'
import { TrashIcon } from '@/components/Icons/Trash'
import MyButton from '@/components/MyButton'
import MyTable from '@/components/MyTable'
import { STATUS_FINANCE } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import { Finance } from '@/services/ClientApi/type'
import { numberWithCommas } from '@/utils/functions'
import { cn } from '@/utils/tailwind'

const TableDesktop = ({
  data,
  onEdit,
  onDelete,
  isDeleting,
  isLoading,
}: {
  data: Finance[]
  onEdit: (finance: Finance) => void
  onDelete: (id: string) => void
  isDeleting: boolean
  isLoading: boolean
}) => {
  const { translate } = useLanguage()

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
      render: (item: Finance) => (
        <span className={item.status === STATUS_FINANCE.Withdraw.toString() ? 'text-red-500' : 'text-green-500'}>
          {`${numberWithCommas(`${item.vndAmount}000`)} VND`}
        </span>
      ),
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
            onClick={() => onEdit(item)}
          >
            <EditIcon className='size-5' />
          </MyButton>
          <MyButton
            isIconOnly
            className='rounded-xl min-h-max hover:scale-110 transition-transform'
            color='danger'
            isLoading={isDeleting}
            size='sm'
            variant='flat'
            onClick={() => onDelete(item._id!)}
          >
            <TrashIcon className='size-5' />
          </MyButton>
        </div>
      ),
    },
  ]

  return (
    <MyTable
      columns={columns}
      data={data || []}
      isLoading={isLoading}
      loadingMessage={translate('accountClouds.loading')}
      noDataMessage={translate('accountClouds.noAccounts')}
    />
  )
}

export default TableDesktop
