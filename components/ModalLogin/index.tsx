import { ValidationErrors } from '@react-types/shared'
import React, { useState } from 'react'

import MyButton from '../MyButton'
import MyInput from '../MyInput'
import MyForm from '../MyForm'

import useLanguage from '@/hooks/useLanguage'
export type FormLogin = {
  sdt?: string
  password?: string
}

const ModalLogin = () => {
  const { translate } = useLanguage()
  const [formData, setFormData] = useState<FormLogin>({})
  const [errors, setErrors] = useState<ValidationErrors>({})

  const onSubmit = (data: FormLogin) => {
    console.log({ data })
  }

  return (
    <div>
      <MyForm className='flex flex-1 flex-col overflow-auto gap-3' validationErrors={errors} onSubmit={onSubmit}>
        <MyInput
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return translate('errors.empty')
            }

            return errors?.username
          }}
          label={translate('name')}
          name='username'
          placeholder={translate('placeholder.enterName')}
          value={formData?.sdt}
          onChange={(e) => setFormData({ ...formData, sdt: e.target.value })}
        />
        <MyInput
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return translate('errors.empty')
            }

            return errors?.sdt
          }}
          label={translate('login.password')}
          name='sdt'
          placeholder={translate('placeholder.enterPassWord')}
          type='password'
          value={formData?.password}
        />

        <MyButton className='w-full' type='submit'>
          Submit
        </MyButton>
      </MyForm>
    </div>
  )
}

export default ModalLogin
