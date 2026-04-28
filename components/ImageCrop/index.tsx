import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'

import MyButton from '../MyButton'

import { getCroppedImg } from '@/utils/cropImage'
import useLanguage from '@/hooks/useLanguage'
import useTypeFile from '@/hooks/useTypeFile'

export interface ImageCropProps {
  imageSrc: string
  onCropComplete: (file: File) => void
  onCancel: () => void
}

const ImageCrop = ({ imageSrc, onCropComplete, onCancel }: ImageCropProps) => {
  const { translate } = useLanguage()
  const { typeFile } = useTypeFile()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null)

  const onCropCompleteHandler = (croppedArea: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels)
  }

  const handleCropSave = async () => {
    if (!croppedAreaPixels) return

    try {
      setIsLoading(true)
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)

      if (croppedImage) {
        onCropComplete(croppedImage)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col w-full h-[500px]'>
      <div className='relative flex-1 w-full bg-gray-900 rounded-lg overflow-hidden'>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape='round'
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropCompleteHandler}
          onZoomChange={setZoom}
          mediaProps={{
            itemType: typeFile,
          }}
        />
      </div>
      <div className='mt-4 flex flex-col gap-4'>
        <input
          type='range'
          value={zoom}
          itemType={typeFile}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby='Zoom'
          onChange={(e) => setZoom(Number(e.target.value))}
          className='w-full'
        />
        <div className='flex justify-end gap-3'>
          {/* <MyButton variant='light' onClick={onCancel} isDisabled={isLoading}> */}
          <MyButton onClick={onCancel} isDisabled={isLoading}>
            {translate('common.cancel')}
          </MyButton>
          <MyButton color='primary' onClick={handleCropSave} isLoading={isLoading}>
            {translate('common.save')}
          </MyButton>
        </div>
      </div>
    </div>
  )
}

export default ImageCrop
