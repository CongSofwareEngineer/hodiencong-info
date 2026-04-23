import { getBase642, getBase64 as getBase64Base } from '../utils/functions'

import useLanguage from './useLanguage'

import { showNotificationError } from '@/utils/notification'
import { MAX_PIXEL_REDUCE } from '@/constants/app'

const useBase64Img = (maxSizeOutputKB = 15, maxScale = MAX_PIXEL_REDUCE) => {
  const { translate } = useLanguage()

  const reduceImageSize = (imageFile: File, maxSizeInKB = 5, quality = 0.7) => {
    return new Promise((resolve) => {
      const reader = new FileReader()

      reader.readAsDataURL(imageFile)
      reader.onload = (event) => {
        const imgElement = document.createElement('img')

        imgElement.src = event.target?.result + ''
        imgElement.onload = () => {
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')

          // Adjust canvas size to reduce the dimensions of the image
          const MAX_WIDTH: any = maxScale // Adjust width as needed
          const scaleSize = MAX_WIDTH / imgElement.width

          canvas.width = MAX_WIDTH
          canvas.height = imgElement.height * scaleSize
          context?.drawImage(imgElement, 0, 0, canvas.width, canvas.height)

          const compressImage = (currentQuality: any) => {
            console.log({ maxSizeInKB })

            canvas.toBlob(
              (blob: any) => {
                if (blob.size / 1024 < maxSizeInKB) {
                  // If the compressed image is under the desired size, return it
                  resolve(blob)
                } else if (currentQuality > 0.1) {
                  // If the image is still too large, compress further by reducing quality
                  compressImage(currentQuality - 0.1)
                } else {
                  // If we've reduced quality too much, return the lowest quality version
                  resolve(blob)
                }
              },
              'image/jpeg',
              currentQuality
            )
          }

          // Start compressing with initial quality
          compressImage(quality)
        }
      }
    })
  }

  const getBase64 = async (
    fileUpload: any
  ): Promise<{
    base64: string
    name: string
  } | null> => {
    try {
      return new Promise(async (resolve) => {
        if (fileUpload.size > 30 * 1048576) {
          const text = translate('warning.maxSizeFile').replace('{size}', `30 MB`)

          showNotificationError(text)
          resolve(null)
        }

        const fileBase = await reduceImageSize(fileUpload, maxSizeOutputKB, 1)
        const base64 = await getBase642(fileBase)

        resolve({
          base64: base64 as any,
          name: fileUpload.name,
        })
      })
    } catch {
      showNotificationError(translate('errors.file'))

      return null
    }
  }

  const getBase64Full = async (fileUpload: any) => {
    try {
      if (fileUpload.size > 30 * 1048576) {
        const text = translate('warning.maxSizeFile').replace('{size}', `30 MB`)

        showNotificationError(text)

        return
      }

      const base64 = await getBase64Base(fileUpload)

      return base64
    } catch {
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
