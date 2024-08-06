export const getDataMyService = async () => {
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

export const getDataMyExperience = async () => {
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
