'use client'
import React from 'react'
import HomeScreenClient from './view'
const getDataMyService = async () => {
  try {
    const res = await fetch(
      'https://tc-store-nestjs.adaptable.app/my-service/all'
    )
    const data: any = await res.json()
    return data?.data || []
  } catch (error) {
    return []
  }
}
const HomeScreen = async () => {
  const [listMyService] = await Promise.all([getDataMyService()])
  return <HomeScreenClient listMyService={listMyService} />
}

export default HomeScreen
