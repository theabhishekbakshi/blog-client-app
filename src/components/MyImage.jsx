
import React from 'react'
import { Image } from '@imagekit/react';

const MyImage = ({src, className, w, h, alt}) => {
  return (
    <Image urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} src={src} loading="lazy" lqip={{active: true, quality: 20}} className={className} alt={alt} width={w} height={h} transformation={[
      {
        width: w,
        height: h,
      }
    ]} />
  )
}

export default MyImage
