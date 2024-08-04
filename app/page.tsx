'use client'
import React from 'react'
import HomeScreenClient from './view'
import { getDataMyService } from '@/services/serverSide'

const HomeScreen = async () => {
  let listMyService = []
  if (typeof window === 'undefined') {
    const [data] = await Promise.all([getDataMyService()])
    listMyService = data
  }

  return <HomeScreenClient listMyService={listMyService} />
}

export default HomeScreen
