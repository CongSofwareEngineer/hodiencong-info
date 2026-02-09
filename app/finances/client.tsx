'use client'
import axios from 'axios'
import React from 'react'

const FinanceScreen = () => {
  const uploadFile = async (file: File) => {
    const formData = new FormData()

    formData.append('file', file)
    formData.append('password', 'Diencong12@5')
    const response = await axios.post('/api/encrypt', formData)
    const data = await response.data

    console.log(data)
  }

  return (
    <div className='mt-20 dark:text-white'>
      <div>FinanceScreen</div>
      <div>
        <input
          type='file'
          onChange={(e) => {
            if (e.target.files) {
              uploadFile(e.target.files[0])
            }
          }}
        />
      </div>
      <div>Upload</div>
    </div>
  )
}

export default FinanceScreen
