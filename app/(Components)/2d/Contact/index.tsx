import { images } from '@/common/images'
import MyImage from '@/components/MyImage'
import useAos from '@/hook/useAos'
import useMedia from '@/hook/useMedia'
import { Button, Input } from 'antd'
import Link from 'next/link'
import React from 'react'
import {
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
} from 'react-share'
import styled from 'styled-components'
const InputCustom = styled(Input)`
  height: 40px !important;
  background: #9f9f9f85 !important;
  color: white !important;
  border-color: #ffffff87 !important;
  &:active,
  &:hover {
    background: #9f9f9f85 !important;
    border-color: white !important ;
  }
  &:focus {
    border-color: white !important ;
  }
  &::placeholder {
    color: white !important;
    opacity: 0.7;
  }
`
const TextAreaCustom = styled(Input.TextArea)`
  background: #9f9f9f85 !important;
  background: #9f9f9f85 !important;
  color: white !important;
  border-color: #ffffff87 !important;

  &:active,
  &:hover {
    background: #9f9f9f85 !important;
    border-color: white !important ;
  }
  &:focus {
    border-color: white !important ;
  }
  &::placeholder {
    color: white !important;
    opacity: 0.7;
  }
`
const Contact = () => {
  const sizeIcon = 40
  useAos(2000)
  const { isMobile } = useMedia()
  return (
    <div className="w-full flex justify-center mb-3">
      <div className="container-content flex md:flex-row md:gap-3 gap-4 flex-col justify-between  ">
        <div data-aos="fade-right" className="flex flex-1 flex-col gap-3">
          <p className="font-fast-hand md:text-[45px] text-[35px]">
            Contact Us
          </p>
          <Link className="flex gap-2 items-center" href={'tel:0392225405'}>
            <MyImage
              src={images.home.banner.iconTelePhone}
              alt="contact-telephone"
              widthImage="30px"
              heightImage="30px"
              className="hover:scale-110 cursor-pointer"
            />
            <span className=" text-[20px] text-white hover:underline hover:font-bold">
              0392225405
            </span>
          </Link>

          <Link
            className="flex gap-2 items-center"
            href={'mailto:hodiencong2000.@gmail.com'}
          >
            <MyImage
              src={images.home.banner.iconMessage}
              alt="contact-email"
              widthImage="30px"
              heightImage="30px"
              className="hover:scale-110 cursor-pointer"
            />
            <span className=" text-[20px] text-white hover:underline hover:font-bold">
              hodiencong2000.@gmail.com
            </span>
          </Link>
          <div className="flex gap-2 mt-2">
            <Link
              className="hover:scale-110  transition-all duration-300"
              href={
                isMobile
                  ? 'fb://page/100080400793331'
                  : 'https://www.facebook.com/profile.php?id=100080400793331'
              }
            >
              <FacebookIcon size={sizeIcon} />
            </Link>
            <Link
              className="hover:scale-110  transition-all duration-300"
              href={
                'https://www.linkedin.com/in/c%C3%B4ng-h%E1%BB%93-di%C3%AAn-1414752aa/'
              }
            >
              <LinkedinIcon size={sizeIcon} />
            </Link>

            <Link
              className="hover:scale-110  transition-all duration-300"
              href={
                isMobile
                  ? 'tg://resolve?phone=+84392225405'
                  : 'http://t.me/+84392225405'
              }
            >
              <TelegramIcon size={sizeIcon} />
            </Link>
            <Link
              href={
                isMobile
                  ? 'twitter://CongEngineer'
                  : 'https://twitter.com/CongEngineer'
              }
              className="hover:scale-110  transition-all duration-300"
            >
              <TwitterIcon size={sizeIcon} />
            </Link>
            <Link href={'https://github.com/CongSofwareEngineer'}>
              <MyImage
                className="cursor-pointer bg-white hover:scale-110  transition-all duration-300"
                alt="contact-github"
                src={images.home.iconGithub}
                widthImage="40px"
              />
            </Link>
          </div>
        </div>
        {isMobile ? (
          <div
            data-aos={'fade-right'}
            className="relative bottom-[-15px] flex md:w-[60%] flex-col gap-5  "
          >
            <InputCustom placeholder="Your Name" className="w-full" />
            <InputCustom placeholder="Your Email" className="w-full" />
            <TextAreaCustom
              placeholder="Your messages"
              rows={5}
              className="w-full"
            />
            <Button className="w-[150px]" size="large">
              Submit
            </Button>
          </div>
        ) : (
          <div
            data-aos={'fade-left'}
            className="relative bottom-[-15px] flex md:w-[60%] flex-col gap-5  "
          >
            <InputCustom placeholder="Your Name" className="w-full" />
            <InputCustom placeholder="Your Email" className="w-full" />
            <TextAreaCustom
              placeholder="Your messages"
              rows={5}
              className="w-full"
            />
            <Button className="w-[150px]" size="large">
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Contact
