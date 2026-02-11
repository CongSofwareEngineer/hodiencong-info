import MyButton from '@/components/MyButton'
import { CopyIcon } from '@/components/Icons/Copy'
import { EditIcon } from '@/components/Icons/Edit'
import { TrashIcon } from '@/components/Icons/Trash'
import MyTable from '@/components/MyTable'
import useLanguage from '@/hooks/useLanguage'
import { AccountCloud } from '@/services/ClientApi/type'
import { ellipsisText } from '@/utils/functions'
import { copyToClipboard } from '@/utils/notification'
import { cn } from '@/utils/tailwind'

const TableDesktop = ({
  data,
  onEdit,
  onDelete,
  isDeleting,
  isLoading,
}: {
  data: AccountCloud[]
  onEdit: (account: AccountCloud) => void
  onDelete: (id: string) => void
  isDeleting: boolean
  isLoading: boolean
}) => {
  const { translate } = useLanguage()

  const columns = [
    {
      header: translate('accountClouds.nameApp'),
      key: 'nameApp',
      className: 'font-medium',
      render: (item: AccountCloud) => <div className='truncate max-w-[220px]' title={item.nameApp}>{item.nameApp || '—'}</div>,
    },
    {
      header: translate('accountClouds.userName'),
      key: 'userName',
      render: (item: AccountCloud) => (
        <div className='truncate max-w-[260px] font-mono' title={item.userName}>
          <span className='flex items-center gap-2'>
            <span>{item.userName || '—'}</span>
            {item.userName && <CopyIcon className='size-4 cursor-pointer' onClick={() => copyToClipboard(item.userName)} />}
          </span>
        </div>
      ),
    },
    {
      header: translate('accountClouds.password'),
      key: 'password',
      render: (item: AccountCloud) => (
        <div className='truncate max-w-[240px] font-mono' title={item.password ? '••••••••' : ''}>
          {item.password ? (
            <span className='flex items-center gap-2'>
              <span>{ellipsisText(item.password, 2, 2)}</span>
              <CopyIcon className='size-4 cursor-pointer' onClick={() => copyToClipboard(item.password)} />
            </span>
          ) : (
            '—'
          )}
        </div>
      ),
    },
    {
      header: translate('accountClouds.pinCode'),
      key: 'pinCode',
      render: (item: AccountCloud) => (
        <div className='truncate max-w-[180px] font-mono'>
          {item.pinCode ? (
            <span className='flex items-center gap-2'>
              <span>{ellipsisText(item.pinCode, 2, 2)}</span>
              <CopyIcon className='size-4 cursor-pointer' onClick={() => copyToClipboard(item.pinCode)} />
            </span>
          ) : (
            '—'
          )}
        </div>
      ),
    },
    {
      header: translate('accountClouds.stk'),
      key: 'stk',
      render: (item: AccountCloud) => (
        <div className='truncate max-w-[220px] font-mono' title={item.stk}>
          {item.stk ? (
            <span className='flex items-center gap-2'>
              <span>{ellipsisText(item.stk, 6, 4)}</span>
              <CopyIcon className='size-4 cursor-pointer' onClick={() => copyToClipboard(item.stk)} />
            </span>
          ) : (
            '—'
          )}
        </div>
      ),
    },
    {
      header: translate('accountClouds.type'),
      key: 'type',
      render: (item: AccountCloud) => (
        <span
          className={cn(
            'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
            item.type ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/20' : 'text-gray-500 bg-gray-100 dark:bg-slate-800'
          )}
        >
          {item.type || '—'}
        </span>
      ),
    },
    {
      header: translate('accountClouds.actions'),
      key: 'actions',
      className: 'text-right',
      render: (item: AccountCloud) => (
        <div className='flex justify-end space-x-3 gap-6'>
          <MyButton
            isIconOnly
            className='rounded-xl hover:scale-110 transition-transform  min-h-max'
            color='warning'
            size='sm'
            variant='flat'
            onClick={() => onEdit(item)}
          >
            <EditIcon className='size-5' />
          </MyButton>
          <MyButton
            isIconOnly
            className='rounded-xl hover:scale-110 transition-transform  min-h-max'
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
    <div>
      <MyTable
        columns={columns}
        data={data || []}
        isLoading={isLoading}
        loadingMessage={translate('accountClouds.loading')}
        noDataMessage={translate('accountClouds.noAccounts')}
      />
    </div>
  )
}

export default TableDesktop

