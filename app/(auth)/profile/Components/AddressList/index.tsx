'use client'

import React, { useState } from 'react'

import AddressForm from '../AddressForm'
import VerifyPassword from '../VerifyPassword'

import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import useModal from '@/hooks/useModal'
import UserAPI from '@/services/API/User'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { PlusIcon } from '@/components/Icons/Plus'
import { EditIcon } from '@/components/Icons/Functions/Edit'
import { TrashIcon } from '@/components/Icons/Trash'
import { UserAddress } from '@/types'

const AddressList = () => {
  const { translate } = useLanguage()
  const { user, setUser } = useUser()
  const { openModal, closeModal } = useModal()

  const [showAll, setShowAll] = useState(false)

  const addresses = user?.addresses || []
  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0]

  const handleUpdateUserAddresses = (newAddresses: UserAddress[]) => {
    if (user) {
      setUser({ ...user, addresses: newAddresses })
    }
  }

  const onAdd = () => {
    openModal({
      title: translate('profile.verifyTitle') || 'Security Verification',
      children: (
        <VerifyPassword
          onVerified={() => {
            openModal({
              title: translate('profile.addresses.add'),
              children: (
                <AddressForm
                  onCancel={closeModal}
                  onSuccess={async (data) => {
                    try {
                      const res = await UserAPI.addAddress(data)

                      if (res?.data) {
                        const newAddresses = data.isDefault
                          ? addresses.map((a) => ({ ...a, isDefault: false })).concat(res.data as any)
                          : addresses.concat(res.data as any)

                        handleUpdateUserAddresses(newAddresses)
                        showNotificationSuccess(translate('accounts.addSuccess'))
                        closeModal()
                      }
                    } catch (error) {
                      showNotificationError(translate('errors.somethingWrong'))
                    }
                  }}
                />
              ),
            })
          }}
        />
      ),
    })
  }

  const onEdit = (address: UserAddress) => {
    openModal({
      title: translate('profile.verifyTitle') || 'Security Verification',
      children: (
        <VerifyPassword
          onVerified={() => {
            openModal({
              title: translate('profile.addresses.edit'),
              children: (
                <AddressForm
                  address={address}
                  onCancel={closeModal}
                  onSuccess={async (data) => {
                    try {
                      const res = await UserAPI.updateAddress(address._id!, data)

                      if (res?.data) {
                        let newAddresses = addresses.map((a) => (a._id === address._id ? res.data : a))

                        if (data.isDefault) {
                          newAddresses = newAddresses.map((a) => (a._id === address._id ? a : { ...a, isDefault: false }))
                        }
                        handleUpdateUserAddresses(newAddresses as any)
                        showNotificationSuccess(translate('accounts.updateSuccess'))
                        closeModal()
                      }
                    } catch (error) {
                      showNotificationError(translate('errors.somethingWrong'))
                    }
                  }}
                />
              ),
            })
          }}
        />
      ),
    })
  }

  const onDelete = (id: string) => {
    if (window.confirm(translate('profile.addresses.confirmDelete'))) {
      UserAPI.deleteAddress(id).then((res) => {
        if (res?.status) {
          handleUpdateUserAddresses(addresses.filter((a) => a._id !== id))
          showNotificationSuccess(translate('accounts.deleteSuccess'))
        }
      })
    }
  }

  const renderAddressItem = (item: UserAddress) => (
    <div
      key={item._id}
      className={`p-4 rounded-2xl border-2 transition-all flex justify-between items-center ${
        item.isDefault ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900'
      }`}
    >
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <span className='font-bold text-gray-900 dark:text-gray-100'>{item.label || translate('profile.addresses.default')}</span>
          {item.isDefault && (
            <span className='px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-full'>
              {translate('profile.addresses.default')}
            </span>
          )}
        </div>
        <p className='text-sm text-gray-600 dark:text-gray-400'>{item.address}</p>
      </div>

      <div className='flex gap-1'>
        <MyButton isIconOnly size='sm' onClick={() => onEdit(item)}>
          <EditIcon className='w-4 h-4' />
        </MyButton>
        <MyButton isIconOnly size='sm' color='danger' onClick={() => onDelete(item._id!)}>
          <TrashIcon className='w-4 h-4' />
        </MyButton>
      </div>
    </div>
  )

  return (
    <div className='w-full space-y-4'>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='text-lg font-bold flex items-center gap-2'>
          <div className='w-1 h-6 bg-indigo-600 rounded-full' />
          {translate('profile.addresses.title')}
        </h3>
        <div className='flex gap-2'>
          {addresses.length > 1 && (
            <MyButton size='sm' onClick={() => setShowAll(!showAll)}>
              {showAll ? translate('common.close') : `${translate('common.view')} (${addresses.length})`}
            </MyButton>
          )}
          <MyButton size='sm' color='primary' onClick={onAdd} startContent={<PlusIcon className='w-4 h-4' />}>
            {translate('profile.addresses.add')}
          </MyButton>
        </div>
      </div>

      {addresses.length === 0 ? (
        <div className='p-8 text-center bg-gray-50 dark:bg-gray-800/30 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700'>
          <p className='text-gray-500'>{translate('accounts.noAccounts')}</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-3'>
          {showAll ? addresses.map((item) => renderAddressItem(item)) : defaultAddress && renderAddressItem(defaultAddress)}
        </div>
      )}
    </div>
  )
}

export default AddressList
