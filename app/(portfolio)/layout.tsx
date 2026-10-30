import Backdrop from '@/components/Cinematic/Backdrop'

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='cinematic dark'>
      <Backdrop />
      {children}
    </div>
  )
}
