'use client'

import React, { useState, useMemo } from 'react'

import ServiceForm from './ServiceForm'

import MyTable from '@/components/MyTable'
import MyButton from '@/components/MyButton'
import { PlusIcon } from '@/components/Icons/Plus'
import { TrashIcon } from '@/components/Icons/Trash'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import { showNotificationSuccess } from '@/utils/notification'
import { LAUNDRY_SERVICES, LAUNDRY_BRANCHES } from '@/constants/laundry'
import useMedia from '@/hooks/useMedia'

export type ServiceFormData = {
  _id?: string
  name?: string
  address?: string
  price?: string | number
  unit?: string
  promotion?: string
}

const ServiceTable = () => {
  const { translate } = useLanguage()
  const { openModal, closeModal } = useModal()
  const { isMobile } = useMedia()

  const [configs, setConfigs] = useState<any[]>(
    LAUNDRY_SERVICES.map((s, index) => ({
      ...s,
      address: LAUNDRY_BRANCHES[index % LAUNDRY_BRANCHES.length].address,
      promotion: index === 0 ? '5% discount for >10kg' : '',
    }))
  )

  const handleAddOrEdit = (data: ServiceFormData, id?: string) => {
    if (id) {
      setConfigs(configs.map((c) => (c._id === id ? { ...c, ...data } : c)))
      showNotificationSuccess(translate('common.update'))
    } else {
      const newConfig = {
        _id: Math.random().toString(36).substr(2, 9),
        ...data,
      }
      setConfigs([newConfig, ...configs])
      showNotificationSuccess(translate('common.create'))
    }
    closeModal()
  }

  const handleDelete = (id: string) => {
    if (confirm(translate('warning.doYouWantDetele'))) {
      setConfigs(configs.filter((c) => c._id !== id))
      showNotificationSuccess(translate('common.delete'))
    }
  }

  const handleOpenModal = (item?: ServiceFormData) => {
    openModal({
      title: item ? translate('common.edit') : translate('common.create'),
      children: (
        <ServiceForm 
          initialData={item} 
          onSuccess={(data) => handleAddOrEdit(data, item?._id)} 
        />
      ),
    })
  }

  const columns = useMemo(
    () => [
      { header: translate('laundry.service'), key: 'name' },
      { header: translate('footer.address'), key: 'address' },
      { 
        header: translate('laundry.price'), 
        key: 'price', 
        render: (item: any) => `${Number(item.price).toLocaleString()} VND / ${item.unit}` 
      },
      { header: translate('laundry.promotion'), key: 'promotion' },
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
    [translate, configs]
  )

  const renderMobile = () => {
    return (
      <div className='grid grid-cols-1 gap-4'>
        {configs.map((item) => (
          <div key={item._id} className='p-5 bg-white dark:bg-gray-700/20 rounded-3xl border border-gray-100 dark:border-gray-700 space-y-4 shadow-sm'>
            <div className='flex justify-between items-start gap-4'>
              <div className='flex-1'>
                <h3 className='font-bold text-lg text-gray-900 dark:text-white leading-tight'>{item.name}</h3>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2'>{item.address}</p>
              </div>
              <div className='text-right'>
                <p className='font-black text-purple-600 dark:text-purple-400'>{Number(item.price).toLocaleString()} VND</p>
                <p className='text-[10px] text-gray-400 uppercase font-bold tracking-tighter'>per {item.unit}</p>
              </div>
            </div>

            {item.promotion && (
              <div className='px-3 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 rounded-xl'>
                <p className='text-xs text-purple-700 dark:text-purple-300 font-medium'>
                  ✨ {item.promotion}
                </p>
              </div>
            )}

            <div className='flex gap-3 pt-2'>
              <MyButton color='secondary' size='sm' className='flex-1 rounded-xl text-white' onPress={() => handleOpenModal(item)}>
                {translate('common.edit')}
              </MyButton>
              <MyButton size='sm' isIconOnly color='danger' className='rounded-xl' onPress={() => handleDelete(item._id)}>
                <TrashIcon className='w-4 h-4' />
              </MyButton>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='space-y-6 p-4 md:p-8 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-[32px] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h2 className='text-2xl md:text-3xl font-black bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
            {translate('laundry.priceList')}
          </h2>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>{translate('laundry.discountNotice')}</p>
        </div>
        <MyButton
          color='secondary'
          startContent={<PlusIcon className='w-5 h-5' />}
          onPress={() => handleOpenModal()}
          className='w-full sm:w-auto h-12 px-6 rounded-2xl shadow-lg shadow-purple-500/25 font-bold hover:scale-105 active:scale-95 transition-all text-white'
        >
          {translate('common.create')}
        </MyButton>
      </div>

      {isMobile ? renderMobile() : <MyTable columns={columns as any} data={configs} className='border-none rounded-2xl overflow-hidden shadow-none' />}
    </div>
  )
}

export default ServiceTable
