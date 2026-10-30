import { Account } from '@/services/ClientApi/type'
import useLanguage from '@/hooks/useLanguage'
import { ellipsisText } from '@/utils/functions'
import { CopyIcon } from '@/components/Icons/Functions/Copy'
import { EditIcon } from '@/components/Icons/Functions/Edit'
import { TrashIcon } from '@/components/Icons/Trash'
import { copyToClipboard } from '@/utils/notification'
import MyTable from '@/components/MyTable'

const TableDesktop = ({
  data,
  onEdit,
  onDelete,
  isDeleting,
  isLoading,
}: {
  data: Account[]
  onEdit: (account: Account) => void
  onDelete: (id: string) => void
  isDeleting: boolean
  isLoading: boolean
}) => {
  const { translate } = useLanguage()

  const columns = [
    {
      header: translate('accounts.name'),
      key: 'name',
      className: 'font-medium',
      render: (item: Account) => (
        <div className='truncate max-w-[300px] font-mono ' title={item.address}>
          {item?.name || ellipsisText(item.address || '', 4, 6)}
        </div>
      ),
    },
    {
      header: translate('accounts.address'),
      key: 'address',
      render: (item: Account) => (
        <div className='truncate max-w-[300px] font-mono ' title={item.address}>
          <span className='flex items-center gap-2'>
            {item.address ? (
              <>
                <span>{ellipsisText(item.address || '', 6, 6)}</span>
                <CopyIcon className='size-4 cursor-pointer' onClick={() => copyToClipboard(item.address || '')} />
              </>
            ) : (
              'No Address'
            )}
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
              <span>{ellipsisText(item.privateKey, 7, 7)}</span>
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
              <span>{ellipsisText(item.seedPhrase, 7, 7)}</span>
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
          <button
            className='btn btn-square btn-primary btn-sm rounded-xl hover:scale-110 transition-transform  min-h-max'
            onClick={() => onEdit(item)}
            type='button'
          >
            <EditIcon className='size-5' />
          </button>
          <button
            className='btn btn-square btn-error btn-sm rounded-xl hover:scale-110 transition-transform  min-h-max'
            onClick={() => onDelete(item._id!)}
            disabled={isDeleting}
            type='button'
          >
            {isDeleting && <span className='loading loading-spinner loading-sm' />}
            <TrashIcon className='size-5' />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className='  '>
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

export default TableDesktop
