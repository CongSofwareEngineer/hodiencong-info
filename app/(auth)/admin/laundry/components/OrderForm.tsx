'use client'

import React, { useState } from 'react'

import { OrderFormData } from './OrderTable'

import MyForm from '@/components/MyForm'
import InputForm from '@/components/MyForm/Input'
import useLanguage from '@/hooks/useLanguage'
import useCheckForm from '@/hooks/useCheckForm'

type Props = {
  initialData?: OrderFormData
  onSuccess: (data: OrderFormData) => void
}

const OrderForm = ({ initialData, onSuccess }: Props) => {
  const { translate } = useLanguage()
  const { checkNumberPhone } = useCheckForm()

  const [form, setForm] = useState<OrderFormData>(initialData || {})
  const [formError, setFormError] = useState<OrderFormData>({})

  const onChangeForm = (data: OrderFormData) => {
    if (typeof data.phoneNumber !== 'undefined') {
      const error = checkNumberPhone(data.phoneNumber)

      setFormError((prev) => ({ ...prev, phoneNumber: error || undefined }))
    }
    setForm((prev) => ({ ...prev, ...data }))
  }

  const handleSubmit = () => {
    // We use the cumulative state 'form' for the final submission
    onSuccess(form)
  }

  return (
    <MyForm onSubmit={handleSubmit} className='flex flex-col gap-5 p-1'>
      <InputForm
        name='customerName'
        label={translate('laundry.customerName')}
        placeholder={translate('laundry.enterName')}
        value={form.customerName}
        onChange={(v) => onChangeForm({ customerName: v })}
        isRequired
      />
      <InputForm
        name='phoneNumber'
        label={translate('laundry.phoneNumber')}
        placeholder={translate('laundry.enterPhone')}
        value={form.phoneNumber}
        onChange={(v) => onChangeForm({ phoneNumber: v })}
        validate={checkNumberPhone}
        errorMessage={() => formError.phoneNumber}
        isRequired
      />
      <InputForm
        type='number'
        name='weight'
        label={translate('laundry.weight')}
        placeholder='0.0'
        value={form.weight?.toString()}
        onChange={(v) => onChangeForm({ weight: v })}
        isRequired
      />
      <InputForm
        name='pickupDate'
        label={translate('laundry.pickupDate')}
        type='date'
        value={form.pickupDate}
        onChange={(v) => onChangeForm({ pickupDate: v })}
        isRequired
      />

      <div className='flex gap-2 justify-end mt-4'>
        <button type='submit' className='btn btn-primary w-full'>
          {translate('common.save')}
        </button>
      </div>
    </MyForm>
  )
}

export default OrderForm
