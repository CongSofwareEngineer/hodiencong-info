import { useState } from 'react'

import { Account } from '@/services/ClientApi/type'
import useLanguage from '@/hooks/useLanguage'
import AccountAPI from '@/services/API/Account'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import MyInput from '@/components/MyInput'
import MyInputArea from '@/components/MyInputArea'
import MyButton from '@/components/MyButton'
import InputForm from '@/components/MyForm/Input'
import InputAreaForm from '@/components/MyForm/InputArea'

const AccountForm = ({ account, onSuccess, refetch }: { account?: Account; onSuccess: () => void; refetch: () => void }) => {
  const [formData, setFormData] = useState<Partial<Account>>(account || {})
  const [isLoading, setIsLoading] = useState(false)
  const { translate } = useLanguage()

  const create = async (body: any) => {
    const res = await AccountAPI.create(body)

    if (res.data) {
      showNotificationSuccess(translate('accounts.addSuccess'))
      refetch()
      onSuccess()
    } else {
      showNotificationError(translate('accounts.addError'))
    }
  }

  const update = async (body: any) => {
    const res = await AccountAPI.update(account?._id!, body)

    if (res.data) {
      showNotificationSuccess(translate('accounts.updateSuccess'))
      refetch()
      onSuccess()
    } else {
      showNotificationError(translate('accounts.updateError'))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      let res

      if (account) {
        res = await update(formData)
      } else {
        res = await create(formData)
      }
    } catch (error) {
      showNotificationError(translate('accounts.updateError'))
    }
  }

  return (
    <form className='space-y-4 w-full flex flex-col gap-3' onSubmit={handleSubmit}>
      <InputForm label={translate('accounts.name')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e })} />
      <InputForm label={translate('accounts.address')} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e })} />
      <InputAreaForm
        label={translate('accounts.privateKey')}
        value={formData.privateKey}
        onChange={(e) => setFormData({ ...formData, privateKey: e })}
      />
      <InputAreaForm
        label={translate('secureData.tabs.seedPhrase')}
        value={formData.seedPhrase}
        onChange={(e) => setFormData({ ...formData, seedPhrase: e })}
      />
      <MyButton className='w-full' color='primary' isLoading={isLoading} type='submit'>
        {translate('common.save')}
      </MyButton>
    </form>
  )
}

export default AccountForm
