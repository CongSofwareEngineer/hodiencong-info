import { SecureData, SecureDataType, CreateSecureDataInput, UpdateSecureDataInput } from '@/types/secure'

const STORAGE_KEY = 'secure_data_storage'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

class SecureDataApi {
  private static getStorage(): SecureData[] {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  }

  private static setStorage(data: SecureData[]) {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  static async getAll(type?: SecureDataType): Promise<{ data: SecureData[]; messages: string }> {
    await sleep(500)
    const allData = this.getStorage()
    const filteredData = type ? allData.filter((item) => item.type === type) : allData
    return { data: filteredData, messages: 'success' }
  }

  static async getById(id: string): Promise<{ data: SecureData | null; messages: string }> {
    await sleep(300)
    const allData = this.getStorage()
    const item = allData.find((i) => i.id === id) || null
    return { data: item, messages: item ? 'success' : 'fail' }
  }

  static async create(input: CreateSecureDataInput): Promise<{ data: SecureData; messages: string }> {
    await sleep(600)
    const allData = this.getStorage()
    const newItem: SecureData = {
      ...input,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    allData.push(newItem)
    this.setStorage(allData)
    return { data: newItem, messages: 'success' }
  }

  static async update(id: string, input: UpdateSecureDataInput): Promise<{ data: SecureData | null; messages: string }> {
    await sleep(500)
    const allData = this.getStorage()
    const index = allData.findIndex((i) => i.id === id)
    if (index === -1) return { data: null, messages: 'fail' }

    const updatedItem = {
      ...allData[index],
      ...input,
      updatedAt: new Date().toISOString(),
    }
    allData[index] = updatedItem
    this.setStorage(allData)
    return { data: updatedItem, messages: 'success' }
  }

  static async delete(id: string): Promise<{ messages: string }> {
    await sleep(400)
    const allData = this.getStorage()
    const filteredData = allData.filter((i) => i.id !== id)
    this.setStorage(filteredData)
    return { messages: 'success' }
  }
}

export default SecureDataApi
