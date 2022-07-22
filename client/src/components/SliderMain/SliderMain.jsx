import React from 'react'
import Slider2 from '../Slider2/Slider2'

const SliderMain = () => {
  const [navColor, setNavColor] = useState('')
  const [navNumberColor, setNavNumberColor] = useState('')

  return (
    <div>
      <Slider2
        setNavColor={setNavColor}
        setNavNumberColor={setNavNumberColor}
      />
    </div>
  )
}

export default SliderMain
