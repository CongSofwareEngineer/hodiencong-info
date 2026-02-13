import { Account } from '@/services/ClientApi/type'
import useLanguage from '@/hooks/useLanguage'
import { ellipsisText } from '@/utils/functions'
import { CopyIcon } from '@/components/Icons/Copy'
import MyButton from '@/components/MyButton'
import { EditIcon } from '@/components/Icons/Edit'
import { TrashIcon } from '@/components/Icons/Trash'
import { copyToClipboard } from '@/utils/notification'

const AccountCard = ({
  item,
  onEdit,
  onDelete,
  isDeleting,
}: {
  item: Account
  onEdit: (account: Account) => void
  onDelete: (id: string) => void
  isDeleting: boolean
}) => {
  const { translate } = useLanguage()

  return (
    <div className='p-4 rounded-xl border dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-lg flex flex-col gap-4'>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='font-bold text-lg dark:text-white mb-1'>{item.name || 'No Name'}</h3>
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

      <div className='space-y-3'>
        <div className='space-y-1'>
          <span className='text-xs font-semibold light:text-gray-500 dark:text-white uppercase'>{translate('accounts.address')}</span>
          <div className='flex items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg'>
            <span className='font-mono text-xs break-all line-clamp-1 light:text-gray-500 dark:text-white '>
              {item.address ? ellipsisText(item.address, 10, 10) : 'No Address'}
            </span>
            {item.address && <CopyIcon className='size-4 cursor-pointer min-w-4 text-gray-500' onClick={() => copyToClipboard(item.address || '')} />}
          </div>
        </div>

        {item.privateKey && (
          <div className='space-y-1'>
            <span className='text-xs font-semibold text-gray-500 uppercase'>{translate('accounts.privateKey')}</span>
            <div className='flex items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg'>
              <span className='font-mono text-xs break-all line-clamp-1 light:text-gray-500 dark:text-white '>
                {ellipsisText(item.privateKey, 8, 8)}
              </span>
              <CopyIcon className='size-4 cursor-pointer min-w-4 text-gray-500' onClick={() => copyToClipboard(item.privateKey || '')} />
            </div>
          </div>
        )}

        {item.seedPhrase && (
          <div className='space-y-1'>
            <span className='text-xs font-semibold text-gray-500 uppercase'>Seed Phrase</span>
            <div className='flex items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg'>
              <span className='font-mono text-xs break-all line-clamp-1 light:text-gray-500 dark:text-white '>
                {ellipsisText(item.seedPhrase, 8, 8)}
              </span>
              <CopyIcon className='size-4 cursor-pointer min-w-4 text-gray-500' onClick={() => copyToClipboard(item.seedPhrase || '')} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountCard
