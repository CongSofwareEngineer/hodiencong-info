import { useState } from 'react'

import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import useLanguage from '@/hooks/useLanguage'
import AccountCloudAPI from '@/services/API/AccountCloud'
import { AccountCloud } from '@/services/ClientApi/type'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'

const AccountCloudForm = ({
  account,
  onSuccess,
  refetch,
}: {
  account?: AccountCloud
  onSuccess: () => void
  refetch: () => void
}) => {
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
    const res = await AccountCloudAPI.update(account?._id!, body)

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
    <form className='space-y-4 flex flex-col gap-6' onSubmit={handleSubmit}>
      <MyInput label={translate('accountClouds.nameApp')} value={formData.nameApp} onChange={(e) => setFormData({ ...formData, nameApp: e.target.value })} />
      <MyInput
        isRequired
        label={translate('accountClouds.userName')}
        value={formData.userName}
        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
      />
      <MyInput
        isRequired
        type='password'
        label={translate('accountClouds.password')}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <MyInput
        type='password'
        label={translate('accountClouds.pinCode')}
        value={formData.pinCode}
        onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
      />
      <MyInput
        label={translate('accountClouds.stk')}
        value={formData.stk}
        onChange={(e) => setFormData({ ...formData, stk: e.target.value })}
      />
      <MyInput
        type='password'
        label={translate('accountClouds.pinCodeBackup')}
        value={formData.pinCodeBackup}
        onChange={(e) => setFormData({ ...formData, pinCodeBackup: e.target.value })}
      />
      <MyInput label={translate('accountClouds.type')} value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} />
      <MyButton className='w-full' color='primary' isLoading={isLoading} type='submit'>
        {translate('common.save')}
      </MyButton>
    </form>
  )
}

export default AccountCloudForm

