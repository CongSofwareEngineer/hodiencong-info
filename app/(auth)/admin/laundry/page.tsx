'use client'

import OrderTable from './components/OrderTable'
import ServiceTable from './components/ServiceTable'

import useLanguage from '@/hooks/useLanguage'

const AdminLaundryPage = () => {
  const { translate } = useLanguage()

  return (
    <div className='min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto'>
      <div className='mb-10 text-center md:text-left'>
        <h1 className='text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight'>
          {translate('header.home')} / <span className='text-blue-600'>{translate('laundry.adminTitle')}</span>
        </h1>
        <p className='text-gray-500 dark:text-gray-400 text-lg'>{translate('laundry.adminSubtitle')}</p>
      </div>

      <div className='flex flex-col gap-12'>
        <section id='orders-section' className='animate-in fade-in slide-in-from-bottom-5 duration-700'>
          <OrderTable />
        </section>

        <section id='services-section' className='animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200'>
          <ServiceTable />
        </section>
      </div>

      <div className='h-24' />
    </div>
  )
}

export default AdminLaundryPage
