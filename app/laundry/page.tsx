import { Metadata, ResolvingMetadata } from 'next'

import LaundryClient from './client'

import { generateMetaBase } from '@/utils/serverNext'

export async function generateMetadata(_: any, parent: ResolvingMetadata): Promise<Metadata> {
  const preData = await parent
  const metaData = generateMetaBase({
    dataBase: preData,
    override: true,
    title: 'Giặt Ủi Chuyên Nghiệp, Giá Rẻ & Uy Tín | Ho Dien Cong',
    des: 'Bạn đang tìm dịch vụ giặt ủi giá rẻ nhưng vẫn đảm bảo chất lượng? Đừng bỏ qua dịch vụ giặt ủi chuyên nghiệp của chúng tôi. Giá thành hợp lý, minh bạch, phù hợp cho mọi cá nhân và gia đình.',
  })

  return metaData
}

export default function LaundryPage() {
  return <LaundryClient />
}
