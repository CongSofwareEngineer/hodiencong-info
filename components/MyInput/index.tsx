import { Input, InputProps } from '@heroui/input'

import { cn } from '@/utils/tailwind'

const MyInput = ({ ...props }: InputProps) => {
  return (
    <Input
      {...props}
      // className={cn('data-[has-label=true]:mt-[30px]', props?.className)}
      classNames={{
        ...props?.classNames,
        label: cn(' !text-black dark:!text-white font-bold text-lg top-6 z-[2] ', props?.classNames?.label),
        input: cn('!text-black text-base dark:!bg-[#364153] dark:!text-white', props?.classNames?.input),
        errorMessage: cn('text-start', props?.classNames?.errorMessage),
        inputWrapper: cn(
          'dark:!bg-[#364153] dark:!border-[#4a5565]',
          'min-h-12',
          '!ring-0  border-[1px] border-gray-300 !bg-gray-50 !text-black !ring-transparent',

          'dark:group-data-[focus-visible=true]:bg-[#364153] ',
          'dark:group-data-[focus=true]:!bg-[#364153]',
          'dark:group-data-[hover=true]:!bg-[#364153]',

          'group-data-[focus-visible=true]:bg-gray-50 ',
          'group-data-[focus=true]:!bg-gray-50',
          'group-data-[hover=true]:!bg-gray-50',
          props?.classNames?.inputWrapper
        ),
      }}
      labelPlacement={props?.labelPlacement ?? 'outside'}
    />
  )
}

export default MyInput
