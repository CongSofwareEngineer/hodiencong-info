export function delayTime(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const detectImg = (src: any) => {
  try {
    if (!src) {
      return ''
    }

    if (src?.startsWith('https')) {
      return src
    }
    return `https://res.cloudinary.com/tc-store/image/upload/v1722158972/${src}`
  } catch (error) {
    return ''
  }
}
