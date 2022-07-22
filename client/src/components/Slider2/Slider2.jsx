import './_slider2.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { animated } from 'react-spring'

const slider2 = (props) => {
  props.setNavColor('white')
  props.setNavNumberColor('#4ebace')
  props.setBulletColor('#702110')

  return (
    <animated.div style={props.style} className='slider2__container'>
      <div className='slider2__wrapper'>
        <div className='slider2__hero'>
          <div className='slider2__info-container'>
            <div className='slider2__info-wrapper'>
              <div className='slider2__product-model'>FEARlEsS MaisON </div>
              <div className='slider2__info'>
                <div className='slider2__product-model-bottom'>CHAtEAU</div>
                <span className='slider2__product-model-span'>ROuGE</span>
                <div className='slider2__product-line'>AIR JORDAN 1</div>
              </div>
            </div>
          </div>
          <div className='slider2__image-wrapper'>
            <Link
              to={'/product/6213b99c34afb6333f7ddd3c'}
              onClick={() => window.scrollTo({ top: 0 })}
            >
              <img
                className='slider2__image'
                src='../../slider/rouge_res.png'
              />
            </Link>
          </div>
        </div>
      </div>
    </animated.div>
  )
}

export default slider2
