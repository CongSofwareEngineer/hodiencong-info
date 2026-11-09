// Fixed futuristic atmosphere: morphing light blobs, dot matrix, abstract orbit rings,
// perspective grid, scanlines with a slow scan beam, vignette and a touch of noise
const Backdrop = () => {
  return (
    <div aria-hidden className='pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#03040b]'>
      <div className='aurora aurora-1' />
      <div className='aurora aurora-2' />
      <div className='aurora aurora-3' />
      <div className='cine-dots' />

      {/* Abstract orbit rings — top right */}
      <svg
        className='absolute -right-48 -top-48 h-[720px] w-[720px] animate-spin-slower text-cyan-300/20 md:-right-32 md:-top-32'
        fill='none'
        viewBox='0 0 720 720'
      >
        <circle cx='360' cy='360' r='350' stroke='currentColor' strokeDasharray='2 10' />
        <circle cx='360' cy='360' r='290' stroke='currentColor' strokeOpacity='0.6' />
        <circle cx='360' cy='360' r='230' stroke='currentColor' strokeDasharray='60 18 4 18' />
        <path d='M360 10 L360 70 M360 650 L360 710 M10 360 L70 360 M650 360 L710 360' stroke='currentColor' strokeWidth='2' />
        <circle cx='650' cy='360' fill='#67e8f9' r='4' />
      </svg>

      {/* Abstract polygon wireframe — bottom left */}
      <svg className='absolute -bottom-40 -left-40 h-[560px] w-[560px] animate-spin-reverse text-violet-300/15' fill='none' viewBox='0 0 560 560'>
        <polygon points='280,20 505,150 505,410 280,540 55,410 55,150' stroke='currentColor' />
        <polygon points='280,90 445,185 445,375 280,470 115,375 115,185' stroke='currentColor' strokeDasharray='4 8' />
        <path d='M280 20 L280 540 M55 150 L505 410 M505 150 L55 410' stroke='currentColor' strokeOpacity='0.5' />
      </svg>

      <div className='cine-grid' />
      <div className='cine-scanlines' />
      <div className='cine-scan' />
      <div className='cine-vignette' />
      <div className='cine-grain' />
    </div>
  )
}

export default Backdrop
