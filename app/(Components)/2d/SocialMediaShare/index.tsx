import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  TelegramShareButton,
} from 'react-share'
const url = 'https://hdcong.vercel.app/shop'
const title = 'Hồ Diên Công - Profile'

const SocialMediaShare = () => {
  return (
    <div className={'absolute opacity-0 z-[-1]'}>
      <FacebookShareButton url={url} title={title}>
        <></>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <></>
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title}>
        <></>
      </LinkedinShareButton>
      <EmailShareButton url={url} title={title}>
        <></>
      </EmailShareButton>
      <TelegramShareButton url={url} title={title}>
        <></>
      </TelegramShareButton>
    </div>
  )
}

export default SocialMediaShare
