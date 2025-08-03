import { Textarea, TextAreaProps } from '@heroui/input'

import { cn } from '@/utils/tailwind'

const MyInputArea = ({ ...props }: TextAreaProps) => {
  return (
    <Textarea
      {...props}
      classNames={{
        ...props?.classNames,
        label: cn('!text-black  dark:!text-white  text-start w-full font-bold text-lg   z-[2] ', props?.classNames?.label),
        input: cn('!text-black dark:!text-white text-base', props?.classNames?.input),
        errorMessage: cn('text-start', props?.classNames?.errorMessage),

        inputWrapper: cn(
          'dark:!bg-[#364153] dark:!border-[#4a5565]',
          'min-h-12',
          '!ring-0  border-[1px] border-gray-300 !bg-white !text-black !ring-transparent',

          'dark:group-data-[focus-visible=true]:bg-[#364153] ',
          'dark:group-data-[focus=true]:!bg-[#364153]',
          'dark:group-data-[hover=true]:!bg-[#364153]',

          'group-data-[focus-visible=true]:!bg-white',
          'group-data-[focus=true]:!bg-white',
          'group-data-[hover=true]:!bg-white',
          props?.classNames?.inputWrapper
        ),
      }}
      labelPlacement={props?.labelPlacement ?? 'outside'}
      minRows={props?.minRows || 3}
    />
  )
}

export default MyInputArea
