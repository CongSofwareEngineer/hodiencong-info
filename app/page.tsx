'use client'

import ContactMe from './(Components)/ContactMe'
import Home from './(Components)/Home'
import Projects from './(Components)/Projects'
import Skills from './(Components)/Skills'
import SocialMedia from './(Components)/SocialMedia'

const HomePage = () => {
  return (
    <section className=' container md:px-12 px-5 flex flex-col   mx-auto'>
      <Home />
      <Skills />

      <ContactMe />
      <Projects />
      <SocialMedia />
    </section>
  )
}

export default HomePage
