import React, { ReactNode } from 'react'

import { cn } from '@/utils/tailwind'

type Column<T> = {
  header: string | ReactNode
  key: string
  render?: (item: T) => ReactNode
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
  // Skeleton Loader Row
  const TableSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <tr key={`skeleton-${index}`} className='border-b border-slate-800 last:border-0'>
          {columns.map((col, colIndex) => (
            <td key={`skeleton-col-${colIndex}`} className='p-4'>
              <div className='flex items-center space-x-3'>
                <div className='h-4 w-full bg-slate-800/50 rounded-full animate-pulse' />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  )

  return (
    <div className={cn('w-full overflow-hidden rounded-xl border dark:border-slate-800 dark:bg-[#0f172a] shadow-xl', className)}>
      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead className='bg-gray-700 text-white'>
            <tr className='bg-[#1e293b] border-b border-slate-800'>
              {columns.map((col, index) => (
                <th key={index} className={cn('px-4 py-4 text-sm font-bold text-gray-300 tracking-wide', col.className)}>
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
                  className={cn('border-b border-gray-600 hover:bg-gray-600 group transition-colors hover:bg-slate-800/50')}
                >
                  {columns.map((col, colIndex) => (
                    <td key={`${item._id || index}-${colIndex}`} className={cn('p-4 text-sm text-gray-100', col.className)}>
                      {col.render ? col.render(item) : (item as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className='p-12 text-center text-slate-500 italic' colSpan={columns.length}>
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
