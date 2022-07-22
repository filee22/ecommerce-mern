import React, { useEffect, useState } from 'react'
import PictureSlider from '../PictureSlider/PictureSlider'
import './_picture.scss'

const Picture = (props) => {
  const [picture, setPicture] = useState('')

  const [sliderValue, setSliderValue] = useState(1)

  useEffect(() => {
    props.preload.forEach((image) => {
      new Image().src = image
    })
  })

  useEffect(() => {
    setPicture(props.preload[sliderValue - 1])
  }, [sliderValue])

  return (
    <div className='picture__container'>
      <div className='picture__image-container'>
        <img
          className='picture__image'
          src={picture == undefined ? props.preload[0] : picture}
        />
      </div>
      <div className='picture__slider-container'>
        <div className='picture__slider-wrapper'>
          <PictureSlider
            setSliderValue={setSliderValue}
            color={props.color}
            imgNumber={props.imgNumber}
          />
        </div>
      </div>
    </div>
  )
}

export default Picture
