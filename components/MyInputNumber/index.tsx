import { NumberInput, NumberInputProps } from '@heroui/number-input'

import { cn } from '@/utils/tailwind'
import useTheme from '@/zustand/theme'

type Props = Omit<NumberInputProps, 'onChange'> & {
  onChange?: (value: number) => void
}
const MyInputNumber = ({ ...props }: Props) => {
  const { isDarkMode } = useTheme()

  return (
    <NumberInput
      {...props}
      classNames={{
        ...props?.classNames,
        label: cn(isDarkMode ? 'dark:!text-white' : '!text-black', 'font-bold text-base top-6 z-[2] ', props?.classNames?.label),
        input: cn(isDarkMode ? 'dark:!text-white dark:!bg-[#364153]' : '!text-black', ' text-base  ', props?.classNames?.input),
        inputWrapper: cn(
          'min-h-12 !ring-0 border-[1px] border-gray-300 !bg-gray-50 !ring-transparent',
          isDarkMode ? '!text-white' : '!bg-gray-50 !text-black',
          isDarkMode ? 'dark:!bg-[#364153]' : '!bg-gray-50 !text-black',
          isDarkMode ? 'dark:!border-[#4a5565]' : 'border-gray-300',
          isDarkMode
            ? 'dark:group-data-[focus-visible=true]:bg-[#364153] dark:group-data-[focus=true]:!bg-[#364153] dark:group-data-[hover=true]:!bg-[#364153]'
            : 'group-data-[focus-visible=true]:bg-gray-50 group-data-[focus=true]:!bg-gray-50group-data-[hover=true]:!bg-gray-50',
          props?.classNames?.inputWrapper
        ),
      }}
      hideStepper={typeof props?.hideStepper === 'boolean' ? props?.hideStepper : true}
      labelPlacement={props?.labelPlacement ?? 'outside'}
      step={props?.step || 0}
      onChange={(e: any) => {
        const value: any = e?.target?.value

        props?.onChange?.(value)
      }}
    />
  )
}

export default MyInputNumber
