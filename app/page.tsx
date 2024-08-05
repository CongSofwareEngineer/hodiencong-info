import React from 'react'
import HomeScreenClient from './view'
import { getDataMyService } from '@/services/serverSide'

const HomeScreen = async () => {
  let listMyService = []
  const [data] = await Promise.all([getDataMyService()])
  listMyService = data
  console.log({ listMyService })

  return <HomeScreenClient listMyService={listMyService} />
}

export default HomeScreen
