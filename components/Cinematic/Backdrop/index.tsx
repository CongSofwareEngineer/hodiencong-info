// Fixed static atmosphere: soft color glows + dot matrix + vignette.
// Kept static (no blur filters / per-frame animation) so it stays cheap on mobile.
const Backdrop = () => {
  return (
    <div aria-hidden className='pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#03040b]'>
      <div className='cine-glow' />
      <div className='cine-dots' />
      <div className='cine-vignette' />
    </div>
  )
}

export default Backdrop
