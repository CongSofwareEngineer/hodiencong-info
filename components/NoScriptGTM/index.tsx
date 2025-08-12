import React from 'react'

const NoScriptGTM = () => {
  return (
    <noscript>
      <iframe
        height='0'
        src={`https://www.googletagmanager.com/ns.html?id=GTM-N3KGG4XW`}
        style={{ display: 'none', visibility: 'hidden' }}
        width='0'
      />
    </noscript>
  )
}

export default NoScriptGTM
