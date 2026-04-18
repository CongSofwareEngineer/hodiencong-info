import { useState } from 'react'

import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import useLanguage from '@/hooks/useLanguage'
import AccountCloudAPI from '@/services/API/AccountCloud'
import { AccountCloud } from '@/services/ClientApi/type'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import InputForm from '@/components/MyForm/Input'

const AccountCloudForm = ({ account, onSuccess, refetch }: { account?: AccountCloud; onSuccess: () => void; refetch: () => void }) => {
  const [formData, setFormData] = useState<Partial<AccountCloud>>(account || {})
  const [isLoading, setIsLoading] = useState(false)
  const { translate } = useLanguage()

  const create = async (body: Partial<AccountCloud>) => {
    const res = await AccountCloudAPI.create(body)

    if (res.data) {
      showNotificationSuccess(translate('accountClouds.addSuccess'))
      refetch()
      onSuccess()
    } else {
      showNotificationError(translate('accountClouds.addError'))
    }
  }

  const update = async (body: Partial<AccountCloud>) => {
    const res = await AccountCloudAPI.update(account?._id, body)

    if (res.data) {
      showNotificationSuccess(translate('accountClouds.updateSuccess'))
      refetch()
      onSuccess()
    } else {
      showNotificationError(translate('accountClouds.updateError'))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!formData.userName || !formData.password) {
        showNotificationError(translate('accountClouds.requiredError'))

        return
      }

      if (account) {
        await update(formData)
      } else {
        await create(formData)
      }
    } catch {
      showNotificationError(translate('accountClouds.updateError'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className='space-y-4 w-full flex flex-col gap-6' onSubmit={handleSubmit}>
      <InputForm label={translate('accountClouds.nameApp')} value={formData.nameApp} onChange={(e) => setFormData({ ...formData, nameApp: e })} />
      <InputForm
        isRequired
        label={translate('accountClouds.userName')}
        value={formData.userName}
        onChange={(e) => setFormData({ ...formData, userName: e })}
      />
      <InputForm
        isRequired
        label={translate('accountClouds.password')}
        type='password'
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e })}
      />
      <InputForm
        label={translate('accountClouds.pinCode')}
        type='password'
        value={formData.pinCode}
        onChange={(e) => setFormData({ ...formData, pinCode: e })}
      />
      <InputForm label={translate('accountClouds.stk')} value={formData.stk} onChange={(e) => setFormData({ ...formData, stk: e })} />
      <InputForm
        label={translate('accountClouds.pinCodeBackup')}
        type='password'
        value={formData.pinCodeBackup}
        onChange={(e) => setFormData({ ...formData, pinCodeBackup: e })}
      />
      <InputForm label={translate('accountClouds.type')} value={formData.type} onChange={(e) => setFormData({ ...formData, type: e })} />
      <MyButton className='w-full' color='primary' isLoading={isLoading} type='submit'>
        {translate('common.save')}
      </MyButton>
    </form>
  )
}

export default AccountCloudForm
