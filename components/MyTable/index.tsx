import React, { ReactNode } from 'react'

import { cn } from '@/utils/tailwind'

type Column<T> = {
  header: string | ReactNode
  key: string
  render?: (item: T, index?: number) => ReactNode
  className?: string
}

type MyTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  isLoading?: boolean
  loadingMessage?: string
  noDataMessage?: string
  className?: string
}

const MyTable = <T extends { _id?: string }>({ columns, data, isLoading, noDataMessage = 'No data found', className }: MyTableProps<T>) => {
  const TableSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <tr key={`skeleton-${index}`} className='border-b border-gray-100 dark:border-gray-800 last:border-0'>
          {columns.map((col, colIndex) => (
            <td key={`skeleton-col-${colIndex}`} className='px-4 py-3'>
              <div className='h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-[4px] animate-pulse' />
            </td>
          ))}
        </tr>
      ))}
    </>
  )

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-[6px] border shadow-sm',
        'border-gray-200 bg-white',
        'dark:border-gray-700 dark:bg-gray-900',
        className
      )}
    >
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className={cn('border-b', 'bg-gray-50 border-gray-200', 'dark:bg-gray-800 dark:border-gray-700')}>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={cn('px-4 py-3 text-xs font-semibold uppercase tracking-wider', 'text-gray-500 dark:text-gray-400', col.className)}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton />
            ) : data && data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item._id || index}
                  className={cn(
                    'border-b last:border-0 transition-colors',
                    'border-gray-100 hover:bg-gray-50',
                    'dark:border-gray-800 dark:hover:bg-gray-800/60'
                  )}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={`${item._id || index}-${colIndex}`}
                      className={cn('px-4 py-3 text-sm', 'text-gray-700 dark:text-gray-200', col.className)}
                    >
                      {col.render ? col.render(item, index) : (item as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className='py-16 text-center text-sm italic text-gray-400 dark:text-gray-500' colSpan={columns.length}>
                  {noDataMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyTable
