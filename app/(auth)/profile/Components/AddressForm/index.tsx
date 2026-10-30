'use client'

import React, { useState } from 'react'

import MyForm from '@/components/MyForm'
import InputForm from '@/components/MyForm/Input'
import useLanguage from '@/hooks/useLanguage'
import { UserAddress } from '@/types'

type Props = {
  address?: UserAddress
  onSuccess: (data: UserAddress) => void | Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const AddressForm = ({ address, onSuccess, onCancel, isLoading }: Props) => {
  const { translate } = useLanguage()
  const [form, setForm] = useState<UserAddress>(
    address || {
      address: '',
      label: '',
      isDefault: false,
    }
  )

  const handleSubmit = () => {
    if (!form.address) return
    onSuccess(form)
  }

  return (
    <MyForm className='flex flex-col gap-4 p-2' onSubmit={handleSubmit}>
      <InputForm
        label={translate('profile.addresses.label')}
        placeholder='e.g. Home'
        value={form.label}
        onChange={(val) => setForm({ ...form, label: val })}
      />
      <InputForm
        label={translate('accounts.address')}
        placeholder={translate('profile.addresses.placeholder')}
        value={form.address}
        onChange={(val) => setForm({ ...form, address: val })}
        isRequired
      />
      <label className='label cursor-pointer gap-2'>
        <input
          checked={!!form.isDefault}
          className='checkbox checkbox-primary checkbox-sm'
          type='checkbox'
          onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
        />
        {translate('profile.addresses.setDefault')}
      </label>

      <div className='flex gap-3 mt-4'>
        <button className='btn btn-primary flex-1' onClick={onCancel} type='button'>
          {translate('common.cancel')}
        </button>
        <button className='btn btn-primary flex-1' type='submit' disabled={isLoading}>
          {isLoading && <span className='loading loading-spinner loading-sm' />}
          {translate('common.save')}
        </button>
      </div>
    </MyForm>
  )
}

export default AddressForm
