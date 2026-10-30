import useClient from '@/hooks/useClient'

const LoadingFirstLoad = () => {
  const isClient = useClient()

  if (isClient) {
    return <></>
  }

  return (
    <div className='fixed z-9999 top-0 left-0 w-screen h-screen flex items-center justify-center bg-black'>
      <span className='loading loading-ring loading-xl text-amber-300' />
    </div>
  )
}

export default LoadingFirstLoad
