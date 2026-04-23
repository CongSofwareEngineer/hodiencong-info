'use client'

import React, { useState } from 'react'

import MyForm from '@/components/MyForm'
import InputForm from '@/components/MyForm/Input'
import MyButton from '@/components/MyButton'
import MyCheckbox from '@/components/MyCheckbox'
import useLanguage from '@/hooks/useLanguage'
import { UserAddress } from '@/services/ClientApi/type'

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
      <MyCheckbox
        isSelected={form.isDefault}
        onChange={(val) => setForm({ ...form, isDefault: val })}
      >
        {translate('profile.addresses.setDefault')}
      </MyCheckbox>

      <div className='flex gap-3 mt-4'>
        <MyButton className='flex-1' onClick={onCancel}>
          {translate('common.cancel')}
        </MyButton>
        <MyButton className='flex-1' color='primary' type='submit' isLoading={isLoading}>
          {translate('common.save')}
        </MyButton>
      </div>
    </MyForm>
  )
}

export default AddressForm
