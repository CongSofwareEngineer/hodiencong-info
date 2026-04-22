'use client'

import React, { useState, useMemo } from 'react'

import OrderForm from './OrderForm'

import MyTable from '@/components/MyTable'
import MyButton from '@/components/MyButton'
import { PlusIcon } from '@/components/Icons/Plus'
import { TrashIcon } from '@/components/Icons/Trash'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import { showNotificationSuccess } from '@/utils/notification'
import useMedia from '@/hooks/useMedia'

export type OrderFormData = {
  _id?: string
  customerName?: string
  phoneNumber?: string
  weight?: string
  pickupDate?: string
  status?: string
}

const OrderTable = () => {
  const { translate } = useLanguage()
  const { openModal, closeModal } = useModal()
  const { isMobile } = useMedia()

  const [orders, setOrders] = useState<any[]>([
    { _id: '1', customerName: 'Nguyễn Văn A', phoneNumber: '0901234567', weight: 5, pickupDate: '2024-04-25', status: 'pending' },
    { _id: '2', customerName: 'Trần Thị B', phoneNumber: '0912345678', weight: 12, pickupDate: '2024-04-26', status: 'processing' },
  ])

  const handleAddOrEdit = (data: OrderFormData, id?: string) => {
    if (id) {
      setOrders(orders.map((o) => (o._id === id ? { ...o, ...data } : o)))
      showNotificationSuccess(translate('common.update'))
    } else {
      const newOrder = {
        _id: Math.random().toString(36).substr(2, 9),
        ...data,
        status: 'pending',
      }
      setOrders([newOrder, ...orders])
      showNotificationSuccess(translate('common.create'))
    }
    closeModal()
  }

  const handleDelete = (id: string) => {
    if (confirm(translate('warning.doYouWantDetele'))) {
      setOrders(orders.filter((o) => o._id !== id))
      showNotificationSuccess(translate('common.delete'))
    }
  }

  const handleOpenModal = (item?: OrderFormData) => {
    openModal({
      title: item ? translate('common.edit') : translate('common.create'),
      children: (
        <OrderForm 
          initialData={item} 
          onSuccess={(data) => handleAddOrEdit(data, item?._id)} 
        />
      ),
    })
  }

  const columns = useMemo(
    () => [
      { header: translate('laundry.customerName'), key: 'customerName' },
      { header: translate('laundry.phoneNumber'), key: 'phoneNumber' },
      { header: translate('laundry.weight'), key: 'weight', render: (item: any) => `${item.weight} kg` },
      { header: translate('laundry.pickupDate'), key: 'pickupDate' },
      { header: translate('finances.status'), key: 'status' },
      {
        header: translate('common.actions'),
        key: 'actions',
        render: (item: any) => (
          <div className='flex gap-2'>
            <MyButton
              size='sm'
              onPress={() => handleOpenModal(item)}
            >
              {translate('common.edit')}
            </MyButton>
            <MyButton size='sm' color='danger' onPress={() => handleDelete(item._id)}>
              <TrashIcon className='w-4 h-4' />
            </MyButton>
          </div>
        ),
      },
    ],
    [translate, orders]
  )

  const renderMobile = () => {
    return (
      <div className='grid grid-cols-1 gap-4'>
        {orders.map((item) => (
          <div key={item._id} className='p-4 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-4'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='font-bold text-lg dark:text-white'>{item.customerName}</p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{item.phoneNumber}</p>
              </div>
              <div className='px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider'>
                {item.status}
              </div>
            </div>
            
            <div className='grid grid-cols-2 gap-4 py-2 border-y border-gray-100 dark:border-gray-700'>
              <div className='flex flex-col'>
                <span className='text-gray-400 text-[10px] uppercase font-bold tracking-widest'>{translate('laundry.weight')}</span>
                <span className='font-semibold text-gray-700 dark:text-gray-200'>{item.weight} kg</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-400 text-[10px] uppercase font-bold tracking-widest'>{translate('laundry.pickupDate')}</span>
                <span className='font-semibold text-gray-700 dark:text-gray-200'>{item.pickupDate}</span>
              </div>
            </div>

            <div className='flex gap-3 pt-1'>
              <MyButton size='sm' className='flex-1 rounded-xl' onPress={() => handleOpenModal(item)}>
                {translate('common.edit')}
              </MyButton>
              <MyButton size='sm' isIconOnly color='danger' className='rounded-xl' onPress={() => handleDelete(item._id)}>
                <TrashIcon className='w-4 h-4' />
              </MyButton>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className='text-center py-10 px-4 bg-gray-50 dark:bg-gray-700/20 rounded-2xl border-2 border-dashed border-gray-100 dark:border-gray-700'>
            <p className='text-gray-400 italic'>{translate('warning.noData')}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='space-y-6 p-4 md:p-8 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-[32px] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h2 className='text-2xl md:text-3xl font-black bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
            {translate('laundry.userOrders')}
          </h2>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>{translate('laundry.subtitle')}</p>
        </div>
        <MyButton
          color='primary'
          startContent={<PlusIcon className='w-5 h-5' />}
          onPress={() => handleOpenModal()}
          className='w-full sm:w-auto h-12 px-6 rounded-2xl shadow-lg shadow-blue-500/25 font-bold hover:scale-105 active:scale-95 transition-all'
        >
          {translate('common.create')}
        </MyButton>
      </div>

      {isMobile ? renderMobile() : <MyTable columns={columns as any} data={orders} className='border-none rounded-2xl overflow-hidden shadow-none' />}
    </div>
  )
}

export default OrderTable
