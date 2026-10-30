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

const MyTable = <T extends {}>({ columns, data, isLoading, noDataMessage = 'No data found', className }: MyTableProps<T>) => {
  const TableSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <tr key={`skeleton-${index}`}>
          {columns.map((col, colIndex) => (
            <td key={`skeleton-col-${colIndex}`}>
              <div className='skeleton h-4 w-full' />
            </td>
          ))}
        </tr>
      ))}
    </>
  )

  return (
    <div className={cn('w-full overflow-hidden rounded-box border border-base-content/10 bg-base-200 shadow-sm', className)}>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr className='bg-base-300'>
              {columns.map((col, index) => (
                <th key={index} className={cn('text-xs font-semibold uppercase tracking-wider', col.className)}>
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
                <tr key={`table-${((item as any)._id || index).toString()}`} className='hover:bg-base-300'>
                  {columns.map((col, colIndex) => (
                    <td key={`${(item as any)._id || index}-${colIndex}`} className={cn('text-sm', col.className)}>
                      {col.render ? col.render(item, index) : (item as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className='py-16 text-center text-sm italic opacity-50' colSpan={columns.length}>
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
