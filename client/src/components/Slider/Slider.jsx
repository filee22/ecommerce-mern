import './_slider.scss'
import React from 'react'
import { animated } from 'react-spring'
import { Link } from 'react-router-dom'

const Slider = (props) => {
  props.setNavColor('black')
  props.setNavNumberColor('white')
  props.setBulletColor('crimson')

  return (
    <animated.div style={props.style} className='slider__container'>
      <div className='slider__wrapper'>
        <div className='slider__hero'>
          <div className='slider__info-container'>
            <div className='slider__info-wrapper'>
              <div className='slider__background-text'>BANNED</div>
              <div className='slider__info'>
                <div className='slider__product-model'>BANNED</div>
                <div className='slider__product-line'>AIR JORDAN 1</div>
              </div>
            </div>
          </div>
          <div className='slider__image-wrapper'>
            <Link
              to={'/product/6202773e537f25d5c2e9407a'}
              onClick={() => window.scrollTo({ top: 0 })}
            >
              <img
                className='slider__image'
                src='../../slider/banned_res.png'
              />
            </Link>
          </div>
        </div>
      </div>
    </animated.div>
  )
}

export default Slider
