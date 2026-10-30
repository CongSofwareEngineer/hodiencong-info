// Fixed cinematic atmosphere: aurora lights, perspective grid, vignette and film grain
const Backdrop = () => {
  return (
    <div aria-hidden className='pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#05050a]'>
      <div className='aurora aurora-1' />
      <div className='aurora aurora-2' />
      <div className='aurora aurora-3' />
      <div className='cine-grid' />
      <div className='cine-vignette' />
      <div className='cine-grain' />
    </div>
  )
}

export default Backdrop
