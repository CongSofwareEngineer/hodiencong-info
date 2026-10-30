'use client'
import React, { useState } from 'react'

const BlogClient = () => {
  const [value, setValue] = useState('vi')

  return (
    <div className='w-full p-5'>
      <select className='select' value={value} onChange={(e) => setValue(e.target.value)}>
        <option value='en'>English</option>
        <option value='vi'>Vietnamese</option>
      </select>
    </div>
  )
}

export default BlogClient
