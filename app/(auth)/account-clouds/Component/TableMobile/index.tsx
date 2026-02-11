import MyButton from '@/components/MyButton'
import { CopyIcon } from '@/components/Icons/Copy'
import { EditIcon } from '@/components/Icons/Edit'
import { TrashIcon } from '@/components/Icons/Trash'
import useLanguage from '@/hooks/useLanguage'
import { AccountCloud } from '@/services/ClientApi/type'
import { ellipsisText } from '@/utils/functions'
import { copyToClipboard } from '@/utils/notification'
import { cn } from '@/utils/tailwind'

const AccountCloudCard = ({
  item,
  onEdit,
  onDelete,
  isDeleting,
}: {
  item: AccountCloud
  onEdit: (account: AccountCloud) => void
  onDelete: (id: string) => void
  isDeleting: boolean
}) => {
  const { translate } = useLanguage()

  return (
    <div className='p-4 rounded-xl border dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-lg flex flex-col gap-4'>
      <div className='flex justify-between items-start'>
        <div className='space-y-1'>
          <h3 className='font-bold text-lg dark:text-white mb-1'>{item.nameApp || translate('accountClouds.unnamed')}</h3>
          <div className='flex items-center gap-2'>
            <span
              className={cn(
                'px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider',
                item.type ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/20' : 'text-gray-500 bg-gray-100 dark:bg-slate-800'
              )}
            >
              {item.type || '—'}
            </span>
          </div>
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
          <span className='text-xs font-semibold light:text-gray-500 dark:text-white uppercase'>{translate('accountClouds.userName')}</span>
          <div className='flex items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg'>
            <span className='font-mono text-xs break-all line-clamp-1 light:text-gray-500 dark:text-white '>{item.userName || '—'}</span>
            {item.userName && <CopyIcon className='size-4 cursor-pointer min-w-4 text-gray-500' onClick={() => copyToClipboard(item.userName)} />}
          </div>
        </div>

        {item.password && (
          <div className='space-y-1'>
            <span className='text-xs font-semibold text-gray-500 uppercase'>{translate('accountClouds.password')}</span>
            <div className='flex items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg'>
              <span className='font-mono text-xs break-all line-clamp-1 light:text-gray-500 dark:text-white '>{ellipsisText(item.password, 2, 2)}</span>
              <CopyIcon className='size-4 cursor-pointer min-w-4 text-gray-500' onClick={() => copyToClipboard(item.password)} />
            </div>
          </div>
        )}

        {item.pinCode && (
          <div className='space-y-1'>
            <span className='text-xs font-semibold text-gray-500 uppercase'>{translate('accountClouds.pinCode')}</span>
            <div className='flex items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg'>
              <span className='font-mono text-xs break-all line-clamp-1 light:text-gray-500 dark:text-white '>{ellipsisText(item.pinCode, 2, 2)}</span>
              <CopyIcon className='size-4 cursor-pointer min-w-4 text-gray-500' onClick={() => copyToClipboard(item.pinCode)} />
            </div>
          </div>
        )}

        {item.stk && (
          <div className='space-y-1'>
            <span className='text-xs font-semibold text-gray-500 uppercase'>{translate('accountClouds.stk')}</span>
            <div className='flex items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg'>
              <span className='font-mono text-xs break-all line-clamp-1 light:text-gray-500 dark:text-white '>{ellipsisText(item.stk, 6, 4)}</span>
              <CopyIcon className='size-4 cursor-pointer min-w-4 text-gray-500' onClick={() => copyToClipboard(item.stk)} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountCloudCard

