export const getTypeFile = (type: string) => {
  switch (type) {
    case 'image/png':
      return 'image/png'
    case 'image/webp':
      return 'image/webp'
    default:
      return 'image/jpeg'
  }
}

const getExtensionFromType = (type: string) => {
  switch (type) {
    case 'image/png':
      return 'png'
    case 'image/webp':
      return 'webp'
    default:
      return 'jpg'
  }
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues
    image.src = url
  })

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0,
  flip = { horizontal: false, vertical: false },
  sourceType = 'image/jpeg'
): Promise<File | null> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const outputType = getTypeFile(sourceType)
  const extension = getExtensionFromType(outputType)

  if (!ctx) {
    return null
  }

  // set canvas size to match the bounding box
  canvas.width = image.width
  canvas.height = image.height

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(image.width / 2, image.height / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  // draw rotated image
  ctx.drawImage(image, 0, 0)

  // extracted cropped image
  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0)

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      if (file) {
        resolve(new File([file], `cropped.${extension}`, { type: outputType }))
      } else {
        reject(new Error('Canvas is empty'))
      }
    }, outputType)
  })
}
