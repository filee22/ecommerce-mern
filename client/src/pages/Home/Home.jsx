import './_home.scss'
import React, { useEffect, useState } from 'react'
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from '@material-ui/icons'
import { useTransition } from 'react-spring'

import Categories from '../../components/Categories/Categories'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import Newsletter from '../../components/Newsletter/Newsletter'
import Products from '../../components/Products/Products'
import Slider from '../../components/Slider/Slider'
import Slider2 from '../../components/Slider2/Slider2'
import Slider3 from '../../components/Slider3/Slider3'

const Home = () => {
  const [navColor, setNavColor] = useState('')
  const [navNumberColor, setNavNumberColor] = useState('')
  const [bulletColor, setBulletColor] = useState('')

  const [slideIndex, setSlideIndex] = useState(0)

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }
  }

  const components = [{ name: Slider }, { name: Slider2 }, { name: Slider3 }]

  const CapitalizedComponent = components[slideIndex].name

  const transition = useTransition(slideIndex, {
    initial: { opacity: 1 },
    from: { opacity: 0.6 },
    enter: { opacity: 1 },
    // leave: { opacity: 0.5 },
    config: { duration: 500 },
  })

  const preload = [
    '../../slider/banned_res.png',
    '../../slider/rouge_res.png',
    '../slider/solidgrey_res.jpg',
    '../slider/azure_res.jpg',
  ]

  useEffect(() => {
    preload.forEach((image) => {
      new Image().src = image
    })
  })

  return (
    <div>
      <div>
        <Navbar navColor={navColor} navNumberColor={navNumberColor} />
        <div className='home___arrow-container'>
          <div className='home___arrow-wrapper'>
            <div
              className='home___arrow-left'
              direction='left'
              style={{ color: slideIndex == 1 ? 'white' : 'black' }}
              onClick={() => handleClick('left')}
            >
              <ArrowBackIosOutlined />
            </div>
            <div
              className='home___arrow-right'
              direction='right'
              style={{ color: slideIndex == 1 ? 'white' : 'black' }}
              onClick={() => handleClick('right')}
            >
              <ArrowForwardIosOutlined />
            </div>
          </div>
        </div>
        <div className='home___slider-container'>
          <div className='home___slider-wrapper'>
            {transition(
              (style, item) =>
                item >= 0 && (
                  <CapitalizedComponent
                    setNavColor={setNavColor}
                    setNavNumberColor={setNavNumberColor}
                    setBulletColor={setBulletColor}
                    style={style}
                  />
                )
            )}
          </div>
          <div className='home___navigation-bullets'>
            {[0, 1, 2].map((n) =>
              slideIndex === n ? (
                <div
                  className='home___bullet'
                  key={n}
                  style={{ backgroundColor: bulletColor }}
                ></div>
              ) : (
                <div
                  className='home___bullet'
                  key={n}
                  onClick={() => setSlideIndex(n)}
                ></div>
              )
            )}
          </div>
        </div>
      </div>
      <Categories />
      <div className='home___products-container'>
        <div className='home___products-wrapper'>
          <Products />
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home
