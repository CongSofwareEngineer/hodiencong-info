import { images } from '@/config/images'
import { LINK_CONTACT } from '@/constants/app'

export const PROFILE = {
  name: 'Hồ Diên Công',
  shortName: 'HD Công',
  // Oct 2021 — first professional project
  startCareer: 1633849997000,
}

export const getYearsExperience = () => {
  return new Date().getFullYear() - new Date(PROFILE.startCareer).getUTCFullYear()
}

export const PORTFOLIO_ROUTES = ['/', '/about', '/skills', '/projects', '/contact']

export const NAV_ROUTES = [
  { key: 'home', link: '/' },
  { key: 'about', link: '/about' },
  { key: 'skills', link: '/skills' },
  { key: 'projects', link: '/projects' },
  { key: 'contact', link: '/contact' },
] as const

export type ProjectCategory = 'web' | 'mobile' | 'api'

export type Project = {
  id: 'x402' | 'keyringSmart' | 'nftViewer' | 'bountyKinds' | 'keyringPro' | 'tcStore' | 'apiTcStore'
  title: string
  link: string
  category: ProjectCategory
  image: string
  technologies: string[]
  year: string
  isPersonal?: boolean
  accent: string
}

export const PROJECTS: Project[] = [
  {
    id: 'x402',
    title: 'x402 Premium',
    link: 'https://x402-premium.vercel.app/premium',
    category: 'web',
    image: images.home.project.x402,
    technologies: ['Next.js', 'MongoDB', 'AWS'],
    year: '2025',
    accent: '#f59e0b',
  },
  {
    id: 'keyringSmart',
    title: 'Keyring Smart',
    link: 'https://smart.keyring.app/',
    category: 'web',
    image: images.home.project.keyringSmart,
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'AWS'],
    year: '2024',
    accent: '#22d3ee',
  },
  {
    id: 'nftViewer',
    title: 'NFT Viewer',
    link: 'https://nft.keyring.app/',
    category: 'web',
    image: images.home.project.nftViewer,
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'AWS'],
    year: '2023',
    accent: '#a855f7',
  },
  {
    id: 'bountyKinds',
    title: 'BountyKinds',
    link: 'https://bountykinds.com',
    category: 'web',
    image: images.home.project.bkind,
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'AWS', 'Unity'],
    year: '2022',
    accent: '#ef4444',
  },
  {
    id: 'keyringPro',
    title: 'Keyring Pro',
    link: 'https://keyring.app/',
    category: 'mobile',
    image: images.home.project.keyring,
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    year: '2021',
    accent: '#3b82f6',
  },
  {
    id: 'tcStore',
    title: 'TC Store',
    link: 'https://tcstore.vercel.app/',
    category: 'web',
    image: images.home.project.tcStore,
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Vercel'],
    year: '2024',
    isPersonal: true,
    accent: '#10b981',
  },
  {
    id: 'apiTcStore',
    title: 'API TC Store',
    link: 'https://exuberant-jade-diencong-6e4aa722.koyeb.app/docs',
    category: 'api',
    image: images.home.project.apiTcStore,
    technologies: ['NestJS', 'MongoDB', 'Koyeb'],
    year: '2024',
    isPersonal: true,
    accent: '#84cc16',
  },
]

export type SkillCategory = 'frontend' | 'backend' | 'mobile' | 'database' | 'cloud' | 'tools'

export const SKILLS: Record<SkillCategory, { name: string; level: number; icon: string }[]> = {
  frontend: [
    { name: 'React/Next.js', level: 95, icon: '⚛️' },
    { name: 'TypeScript', level: 92, icon: '📘' },
    { name: 'JavaScript', level: 95, icon: '🟨' },
    { name: 'HTML5/CSS3', level: 98, icon: '🎨' },
    { name: 'Tailwind CSS', level: 95, icon: '💨' },
    { name: 'SASS/SCSS', level: 88, icon: '💅' },
    { name: 'Webpack/Vite', level: 85, icon: '📦' },
  ],
  backend: [
    { name: 'Node.js', level: 93, icon: '🟢' },
    { name: 'Express.js', level: 92, icon: '🚀' },
    { name: 'NestJS', level: 85, icon: '🐈' },
    { name: 'REST APIs', level: 95, icon: '🔗' },
    { name: 'GraphQL', level: 82, icon: '📊' },
    { name: 'Microservices', level: 85, icon: '🏗️' },
  ],
  mobile: [
    { name: 'React Native', level: 90, icon: '📱' },
    { name: 'Flutter/Dart', level: 85, icon: '🦋' },
    { name: 'Expo', level: 88, icon: '🎯' },
    { name: 'App Store Deploy', level: 90, icon: '🚀' },
  ],
  database: [
    { name: 'MongoDB', level: 92, icon: '🍃' },
    { name: 'PostgreSQL', level: 88, icon: '🐘' },
    { name: 'MySQL', level: 85, icon: '🗄️' },
    { name: 'Redis', level: 87, icon: '🔴' },
    { name: 'Firebase', level: 90, icon: '🔥' },
  ],
  cloud: [
    { name: 'AWS', level: 88, icon: '☁️' },
    { name: 'Google Cloud', level: 82, icon: '🌤️' },
    { name: 'Digital Ocean', level: 85, icon: '🌊' },
    { name: 'Docker', level: 90, icon: '🐳' },
    { name: 'Kubernetes', level: 78, icon: '⎈' },
    { name: 'CI/CD', level: 87, icon: '🔄' },
    { name: 'Nginx', level: 83, icon: '🚀' },
    { name: 'Linux/Ubuntu', level: 88, icon: '🐧' },
  ],
  tools: [
    { name: 'Git/GitHub', level: 95, icon: '📝' },
    { name: 'VS Code', level: 98, icon: '💻' },
    { name: 'Figma', level: 85, icon: '🎨' },
    { name: 'Postman', level: 92, icon: '📮' },
    { name: 'Jira/Trello', level: 88, icon: '📋' },
    { name: 'Slack/Discord', level: 95, icon: '💬' },
  ],
}

export const TECH_MARQUEE = [
  'React',
  'Next.js',
  'TypeScript',
  'React Native',
  'Node.js',
  'NestJS',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'Tailwind CSS',
  'Three.js',
  'AWS',
  'Docker',
  'Web3',
  'GraphQL',
  'Zustand',
]

export const JOURNEY = ['y2021', 'y2022', 'y2023', 'y2024', 'y2025'] as const

export const SOCIALS = [
  { key: 'github', title: 'Github', handle: '@CongSofwareEngineer', link: LINK_CONTACT.Github },
  { key: 'linkedin', title: 'LinkedIn', handle: 'Hồ Diên Công', link: LINK_CONTACT.LinkedIn },
  { key: 'facebook', title: 'Facebook', handle: 'Hồ Diên Công', link: LINK_CONTACT.FaceBook },
  { key: 'x', title: 'X (Twitter)', handle: '@CongEngineer', link: LINK_CONTACT.X },
  { key: 'instagram', title: 'Instagram', handle: '@hodiencong', link: LINK_CONTACT.Instagram },
  { key: 'zalo', title: 'Zalo', handle: '0392225405', link: LINK_CONTACT.Zalo },
] as const
