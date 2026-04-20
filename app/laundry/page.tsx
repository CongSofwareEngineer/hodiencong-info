import React from 'react'
import { Metadata } from 'next'
import LaundryClient from './client'

export const metadata: Metadata = {
  title: 'Laundry Service - Ho Dien Cong',
  description: 'Professional laundry and care services for your clothes.',
}

export default function LaundryPage() {
  return <LaundryClient />
}
