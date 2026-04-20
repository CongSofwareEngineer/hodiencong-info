import { Metadata, ResolvingMetadata } from 'next'

import LaundryClient from './client'

import { generateMetaBase } from '@/utils/serverNext'

export async function generateMetadata(_: any, parent: ResolvingMetadata): Promise<Metadata> {
  const preData = await parent
  const metaData = generateMetaBase({
    dataBase: preData,
    override: true,
    title: 'Giặt Ủi Sinh Viên Thủ Dầu Một - Giá Rẻ, Sạch Thơm | Ho Dien Cong',
    des: 'Dịch vụ giặt ủi chuyên nghiệp dành riêng cho sinh viên Thủ Dầu Một. Giá cực rẻ, giặt riêng sạch sẽ, lấy nhanh trong ngày. Uy tín, minh bạch, giúp bạn tiết kiệm thời gian và chi phí.',
  })

  return metaData
}

export default function LaundryPage() {
  return <LaundryClient />
}
