'use client'
import React from 'react'
import HomeScreenClient from './view'
import { getDataMyService } from '@/services/serverSide'

const HomeScreen = async () => {
  const [listMyService] = await Promise.all([getDataMyService()])
  console.log({ listMyService })

  return <HomeScreenClient listMyService={listMyService} />
}

export default HomeScreen
