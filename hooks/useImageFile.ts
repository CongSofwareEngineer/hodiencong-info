import useLanguage from './useLanguage'

import { MAX_FILE_OUTPUT_KB, MAX_PIXEL_REDUCE } from '@/constants/app'
import { showNotificationError } from '@/utils/notification'
import { ERROR_CODE } from '@/constants/error'
const MAX_FILE_SIZE_MB = 10 // 30MB
const QUALITY_STEP = 0.1
const MIN_QUALITY = 0.1

type CompressOptions = {
  maxSizeKB?: number
  maxScale?: number
  initialQuality?: number
  maxFileMB?: number
}

const useImageFile = () => {
  const { translate } = useLanguage()

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

  const getSizeFile = (valueMb: number) => {
    return valueMb * 1024 * 1024
  }

  const getTypeFileCompress = (type: string) => {
    switch (type) {
      case 'image/png':
        return 'image/png'
      case 'image/webp':
        return 'image/webp'
      default:
        return 'image/jpeg'
    }
  }

  const compressImage = async (file: File, config: CompressOptions = {}): Promise<File> => {
    const { initialQuality = 0.8, maxFileMB = MAX_FILE_SIZE_MB, maxScale = MAX_PIXEL_REDUCE, maxSizeKB = MAX_FILE_OUTPUT_KB } = config

    const fileName = file.name
    const maxSizeFile = getSizeFile(maxFileMB)
    const typeCompress = getTypeFileCompress(file.type)

    if (file.size > maxSizeFile) {
      const text = translate('warning.maxSizeFile', {
        size: `${maxFileMB} MB`,
      })

      showNotificationError(text)
      throw new Error(ERROR_CODE.FILE_SIZE_EXCEEDED)
    }

    const img = await loadImage(file)

    if (img.width < maxScale) {
      return file
    }

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
    const compress = (quality: number): Promise<File> => {
      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              const data = new Blob()
              const compressedFile = new File([data], fileName, {
                type: typeCompress,
              })

              resolve(compressedFile)

              return
            }

            const sizeKB = blob.size / 1024

            if (sizeKB <= maxSizeKB || quality <= MIN_QUALITY) {
              const compressedFile = new File([blob], fileName, {
                type: typeCompress,
              })

              resolve(compressedFile)
            } else {
              const nextQuality = Math.max(MIN_QUALITY, quality - QUALITY_STEP)

              compress(nextQuality).then(resolve)
            }
          },
          typeCompress,
          quality
        )
      })
    }
    const res = await compress(initialQuality)

    return res
  }

  return {
    compressImage,
    loadImage,
  }
}

export default useImageFile
