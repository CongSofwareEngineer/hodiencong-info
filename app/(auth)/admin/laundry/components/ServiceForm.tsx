'use client'

import React, { useState } from 'react'

import MyForm from '@/components/MyForm'
import InputForm from '@/components/MyForm/Input'
import InputNumberForm from '@/components/MyForm/InputNumber'
import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'

import { ServiceFormData } from './ServiceTable'

type Props = {
  initialData?: ServiceFormData
  onSuccess: (data: ServiceFormData) => void
}

const ServiceForm = ({ initialData, onSuccess }: Props) => {
  const { translate } = useLanguage()

  const [form, setForm] = useState<ServiceFormData>(initialData || {})

  const onChangeForm = (data: ServiceFormData) => {
    setForm((prev) => ({ ...prev, ...data }))
  }

  const handleSubmit = () => {
    onSuccess(form)
  }

  return (
    <MyForm onSubmit={handleSubmit} className='flex flex-col gap-5 p-1'>
      <InputForm
        name='name'
        label={translate('laundry.service')}
        placeholder='e.g. Wash & Dry'
        value={form.name}
        onChange={(v) => onChangeForm({ name: v })}
        isRequired
      />
      <InputForm
        name='address'
        label={translate('footer.address')}
        placeholder={translate('placeholder.address')}
        value={form.address}
        onChange={(v) => onChangeForm({ address: v })}
        isRequired
      />
      <div className='grid grid-cols-2 gap-4'>
        <InputNumberForm
          name='price'
          label={translate('laundry.price')}
          placeholder='0'
          value={form.price?.toString()}
          onChange={(v) => onChangeForm({ price: v })}
          isRequired
        />
        <InputForm
          name='unit'
          label={translate('laundry.unit')}
          placeholder='kg / item'
          value={form.unit}
          onChange={(v) => onChangeForm({ unit: v })}
          isRequired
        />
      </div>
      <InputForm
        name='promotion'
        label={translate('laundry.promotion')}
        placeholder='e.g. 10% off'
        value={form.promotion}
        onChange={(v) => onChangeForm({ promotion: v })}
      />

      <div className='flex gap-2 justify-end mt-4'>
        <MyButton color='secondary' type='submit' className='w-full text-white'>
          {translate('common.save')}
        </MyButton>
      </div>
    </MyForm>
  )
}

export default ServiceForm
