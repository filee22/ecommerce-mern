import { Slider } from '@mui/material'
import React from 'react'

const PictureSlider = (props) => {
  return (
    <Slider
      aria-label='Picture Slider'
      defaultValue={1}
      sx={{ color: props.color }}
      min={1}
      max={props.imgNumber}
      onChange={(e) => props.setSliderValue(e.target.value)}
    />
  )
}

export default PictureSlider
