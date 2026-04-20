import React from 'react'
import { Metadata } from 'next'

import LaundryClient from './client'

export const metadata: Metadata = {
  title: 'Dịch vụ giặt ủi - Ho Dien Cong',
  description:
    'Bạn đang tìm dịch vụ giặt ủi giá rẻ nhưng vẫn đảm bảo chất lượng? Đừng bỏ qua dịch vụ giặt ủi chuyên nghiệp của chúng tôi. Giá thành hợp lý, minh bạch, phù hợp cho mọi cá nhân và gia đình.',
}

export default function LaundryPage() {
  return <LaundryClient />
}
