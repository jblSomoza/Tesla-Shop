import Image from 'next/image';
import React, { FC } from 'react'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface Props{
    images: string[]
}
export const ProductSlideshow:FC<Props> = ({ images }) => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      verticalSwipe='standard'
    >
      {
        images.map((image) => {
          const url = `${image}`;
          return(
            <div key={url}>
              <img src={url} />
            </div>
          )
        })
      }
    </Carousel>
  )
}
