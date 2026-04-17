'use client'
import React, { useState } from 'react'

import MySelect from '@/components/MySelect'

const BlogClient = () => {
  const [value, setValue] = useState('vi')

  return (
    <div className='w-full p-5'>
      <MySelect
        value={value}
        onChange={(value) => setValue(value?.toString() || '')}
        options={[
          {
            label: 'English',
            id: 'en',
          },
          {
            label: 'Vietnamese',
            id: 'vi',
          },
        ]}
      />
    </div>
  )
}

export default BlogClient
