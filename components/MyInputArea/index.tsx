import { Textarea, TextAreaProps } from '@heroui/input'

import { cn } from '@/utils/tailwind'
import useTheme from '@/zustand/theme'

interface Props extends TextAreaProps {
  showCount?: boolean
}
const MyInputArea = ({ showCount = false, ...props }: Props) => {
  const { isDarkMode } = useTheme()

  console.log({ props })

  return (
    <div className='relative w-full'>
      <Textarea
        {...props}
        classNames={{
          ...props?.classNames,
          label: cn(isDarkMode ? 'dark:!text-white' : '!text-black', 'text-start w-full font-bold text-base  z-[2] ', props?.classNames?.label),
          input: cn(isDarkMode ? 'dark:!text-white dark:!bg-[#364153]' : '!text-black', ' text-base  ', props?.classNames?.input),
          errorMessage: cn('text-start', props?.classNames?.errorMessage),

          inputWrapper: cn(
            'min-h-12 !ring-0  border-[1px] border-gray-300 !bg-gray-50 !ring-transparent',
            isDarkMode ? '!text-white' : '!bg-gray-50 !text-black',
            isDarkMode ? 'dark:!bg-[#364153]' : '!bg-gray-50 !text-black',
            isDarkMode ? 'dark:!border-[#4a5565]' : 'border-gray-300',
            isDarkMode
              ? 'dark:group-data-[focus-visible=true]:bg-[#364153] dark:group-data-[focus=true]:!bg-[#364153] dark:group-data-[hover=true]:!bg-[#364153]'
              : 'group-data-[focus-visible=true]:bg-gray-50 group-data-[focus=true]:!bg-gray-50group-data-[hover=true]:!bg-gray-50',
            props?.classNames?.inputWrapper
          ),
        }}
        labelPlacement={props?.labelPlacement ?? 'outside'}
        minRows={props?.minRows || 3}
      />
      {showCount && (
        <div
          className={cn(isDarkMode ? 'text-white' : 'text-black', props?.isInvalid ? 'absolute' : 'relative', ' bottom-0 w-full text-right right-0')}
        >
          {props?.value?.length ?? 0}/{props?.maxLength}
        </div>
      )}
    </div>
  )
}

export default MyInputArea
