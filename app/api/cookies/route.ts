import { NextRequest } from 'next/server'

import UserAPI from '@/services/API/User'

export async function POST(req: NextRequest) {
  try {
    const cookies = req.cookies.getAll()
    const tokenRefresh = req.cookies.get('tokenRefresh')
    const tokenAccess = req.cookies.get('tokenAccess')

    console.log({ cookies, tokenRefresh, tokenAccess, req })
    const res = await UserAPI.getInfoMe()

    console.log({ res: res?.data })

    return Response.json({ message: 'Đã khóa file thành công thành locked-key.enc' })
  } catch (error) {
    return Response.json({ error: 'Lỗi mã hóa' }, { status: 500 })
  }
}
