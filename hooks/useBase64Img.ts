import { getBase642, getBase64 as getBase64Base } from '../utils/functions'

import useLanguage from './useLanguage'

import { showNotificationError } from '@/utils/notification'
import { MAX_PIXEL_REDUCE } from '@/constants/app'

// Constants
const MAX_FILE_SIZE_BYTES = 30 * 1024 * 1024 // 30MB
const QUALITY_STEP = 0.1
const MIN_QUALITY = 0.1

// Types
type Base64Result = {
  base64: string
  name: string
} | null

type CompressOptions = {
  maxSizeKB: number
  maxScale: number
  initialQuality: number
}

const useBase64Img = (maxSizeOutputKB = 15, maxScale = MAX_PIXEL_REDUCE) => {
  const { translate } = useLanguage()

  /**
   * Resize image to maxScale width while maintaining aspect ratio
   */
  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (event) => {
        const img = new Image()

        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = event.target?.result as string
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  /**
   * Compress image using canvas with iterative quality reduction
   */
  const compressImage = async (file: File, { maxSizeKB, maxScale, initialQuality }: CompressOptions): Promise<Blob> => {
    const img = await loadImage(file)
    const scale = maxScale / img.width
    const width = maxScale
    const height = img.height * scale

    const canvas = document.createElement('canvas')

    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Failed to get canvas context')
    }

    ctx.drawImage(img, 0, 0, width, height)

    // Iterative compression with quality reduction
    const compress = (quality: number): Promise<Blob> => {
      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              const data = new Blob()

              resolve(data)

              return
            }

            const sizeKB = blob.size / 1024

            if (sizeKB <= maxSizeKB || quality <= MIN_QUALITY) {
              resolve(blob)
            } else {
              const nextQuality = Math.max(MIN_QUALITY, quality - QUALITY_STEP)

              compress(nextQuality).then(resolve)
            }
          },
          'image/jpeg',
          quality
        )
      })
    }

    return compress(initialQuality)
  }

  /**
   * Validate file size and show error notification if exceeded
   */
  const validateFileSize = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const text = translate('warning.maxSizeFile').replace('{size}', '30 MB')

      showNotificationError(text)

      return false
    }

    return true
  }

  /**
   * Convert File to base64 with compression
   */
  const getBase64 = async (fileUpload: File): Promise<Base64Result> => {
    try {
      if (!validateFileSize(fileUpload)) {
        return null
      }

      const compressedBlob = await compressImage(fileUpload, {
        maxSizeKB: maxSizeOutputKB,
        maxScale,
        initialQuality: 1,
      })

      const base64 = await getBase642(compressedBlob)

      return {
        base64: base64 as string,
        name: fileUpload.name,
      }
    } catch (error) {
      console.error('Error in getBase64:', error)
      showNotificationError(translate('errors.file'))

      return null
    }
  }

  /**
   * Convert File to base64 without compression (full quality)
   */
  const getBase64Full = async (fileUpload: File): Promise<string | null> => {
    try {
      if (!validateFileSize(fileUpload)) {
        return null
      }

      const res = await getBase64Base(fileUpload)

      return res.base64?.toString() || null
    } catch (error) {
      console.error('Error in getBase64Full:', error)
      showNotificationError(translate('errors.file'))

      return null
    }
  }

  return {
    getBase64,
    getBase64Full,
  }
}

export default useBase64Img
