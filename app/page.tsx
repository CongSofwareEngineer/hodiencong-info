import React from 'react'
import HomeScreenClient from './view'
import { getDataMyService, getDataMyExperience } from '@/services/serverSide'

const HomeScreen = async () => {
  const [listMyService, listMyExperience] = await Promise.all([
    getDataMyService(),
    getDataMyExperience(),
  ])

  return (
    <HomeScreenClient
      listMyExperience={listMyExperience}
      listMyService={listMyService}
    />
  )
}

export default HomeScreen
