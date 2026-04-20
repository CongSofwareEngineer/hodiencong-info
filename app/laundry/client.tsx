'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardHeader } from '@heroui/react'

import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MyInputNumber from '@/components/MyInputNumber'
import MyTable from '@/components/MyTable'
import { MapPinIcon } from '@/components/Icons/MapPin'
import { ExternalLinkIcon } from '@/components/Icons/ExternalLink'
import useLanguage from '@/hooks/useLanguage'
import { LAUNDRY_BRANCHES, LAUNDRY_SERVICES } from '@/constants/laundry'
import { cn } from '@/utils/tailwind'
import { showNotificationSuccess } from '@/utils/notification'
import MyForm from '@/components/MyForm'
import InputForm from '@/components/MyForm/Input'
import InputNumberForm from '@/components/MyForm/InputNumber'

export default function LaundryClient() {
  const { translate } = useLanguage()

  // Form states
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [weight, setWeight] = useState(0)
  const [pickupDate, setPickupDate] = useState('')

  // Calculate pricing
  // For simplicity, we use the first service (Wash & Dry) as default for calculation
  const basePricePerKg = LAUNDRY_SERVICES[0].price
  const subTotal = weight * basePricePerKg
  const hasDiscount = weight >= 10
  const discountAmount = hasDiscount ? subTotal * 0.05 : 0
  const finalTotal = subTotal - discountAmount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showNotificationSuccess(translate('laundry.orderSuccess'))
    // Reset form after a short delay for UX
    setTimeout(() => {
      setCustomerName('')
      setPhoneNumber('')
      setWeight(0)
      setPickupDate('')
    }, 1000)
  }

  const columns = useMemo(
    () => [
      {
        header: translate('laundry.service'),
        key: 'name',
        render: (item: any) => translate(item.nameKey as any) || item.name,
      },
      {
        header: translate('laundry.price'),
        key: 'price',
        render: (item: any) => `${item.price.toLocaleString()} VND`,
      },
      {
        header: translate('laundry.unit'),
        key: 'unit',
        render: (item: any) => `/${item.unit}`,
      },
    ],
    [translate]
  )

  return (
    <div className='min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto'>
      <div className='text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
        <h1 className='text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4'>
          {translate('laundry.title')}
        </h1>
        <p className='text-gray-600 dark:text-gray-400 text-lg'>{translate('laundry.subtitle')}</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
        {/* Left Column: Branches and Price List */}
        <div className='space-y-8'>
          <section>
            <h2 className='text-2xl font-semibold mb-6 flex items-center gap-2'>
              <MapPinIcon className='text-blue-600' />
              {translate('laundry.branches')}
            </h2>
            <div className='grid grid-cols-1 gap-4'>
              {LAUNDRY_BRANCHES.map((branch) => (
                <Card
                  key={branch.id}
                  className='bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all'
                >
                  <Card.Content className='p-5 flex flex-row items-center justify-between'>
                    <div>
                      <h3 className='font-bold text-gray-900 dark:text-white'>{branch.name}</h3>
                      <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>{branch.address}</p>
                    </div>
                    <a
                      href={branch.mapLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors'
                      title={translate('laundry.viewOnMap')}
                    >
                      <ExternalLinkIcon className='w-5 h-5' />
                    </a>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-6'>{translate('laundry.priceList')}</h2>
            <MyTable columns={columns as any} data={LAUNDRY_SERVICES} className='shadow-lg' />
            <div className='mt-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/30 text-orange-700 dark:text-orange-400 text-sm font-medium'>
              {translate('laundry.discountNotice')}
            </div>
          </section>
        </div>

        {/* Right Column: Order Form */}
        <div>
          <Card className='sticky top-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-xl'>
            <CardHeader className='flex flex-col items-start px-6 pt-6 pb-2'>
              <h2 className='text-2xl font-bold'>{translate('laundry.orderForm')}</h2>
              <p className='text-sm text-gray-500 dark:text-gray-400'>{translate('laundry.enterName')}</p>
            </CardHeader>
            {/* <Divider /> */}
            <Card.Content className='px-6 py-6'>
              <MyForm onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-4'>
                  <InputForm
                    placeholder={translate('laundry.enterName')}
                    value={customerName}
                    onChange={setCustomerName}
                    className='w-full'
                    label={translate('laundry.customerName')}
                  />
                  <InputForm
                    placeholder={translate('laundry.enterPhone')}
                    type='tel'
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    className='w-full'
                    label={translate('laundry.phoneNumber')}
                  />
                  <div className='grid grid-cols-2 gap-4'>
                    <InputNumberForm
                      label={translate('laundry.weight')}
                      value={weight?.toString()}
                      onChange={(e) => setWeight(e ? Number(e) : 0)}
                      className='w-full'
                      // suffix={translate('laundry.kg')}
                    />
                    <InputForm
                      placeholder='yyyy-mm-dd'
                      type='date'
                      value={pickupDate}
                      onChange={setPickupDate}
                      className='w-full'
                      label={translate('laundry.pickupDate')}
                    />
                  </div>
                </div>

                <div
                  className={cn(
                    'p-6 rounded-2xl transition-all duration-500',
                    'bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800'
                  )}
                >
                  <h3 className='font-semibold text-gray-700 dark:text-gray-300 mb-4'>{translate('laundry.summary')}</h3>
                  <div className='space-y-3 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-gray-500'>{translate('laundry.total')}</span>
                      <span className='font-medium'>{subTotal.toLocaleString()} VND</span>
                    </div>
                    {hasDiscount && (
                      <div className='flex justify-between text-green-600 dark:text-green-400'>
                        <span className='flex items-center gap-2'>
                          <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                          {translate('laundry.discount')}
                        </span>
                        <span className='font-bold'>-{discountAmount.toLocaleString()} VND</span>
                      </div>
                    )}
                    {/* <Divider className='my-2' /> */}
                    <div className='flex justify-between items-center pt-2'>
                      <span className='text-lg font-bold'>{translate('laundry.finalPrice')}</span>
                      <span className='text-2xl font-black text-blue-600 dark:text-blue-400'>{finalTotal.toLocaleString()} VND</span>
                    </div>
                  </div>
                </div>

                <MyButton
                  type='submit'
                  className='w-full h-12 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all'
                >
                  {translate('laundry.submit')}
                </MyButton>
              </MyForm>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  )
}
