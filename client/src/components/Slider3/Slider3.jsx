import './_slider3.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { animated } from 'react-spring'

const slider3 = (props) => {
  props.setNavColor('black')
  props.setNavNumberColor('white')
  props.setBulletColor('darkorange')

  return (
    <animated.div style={props.style} className='slider3__container'>
      <div className='slider3__wrapper'>
        <div className='slider3__img-container'>
          <Link
            to={'/product/61e042152ff9525942d14ace'}
            onClick={() => window.scrollTo({ top: 0 })}
            style={{ textDecoration: 'none' }}
          >
            <div className='slider3__img-wrapper'>
              <img
                className='slider3__img'
                src='../slider/solidgrey_res.jpg'
                alt=''
              />
              <p className='slider3__img-text'>700 Wave Runner Solid Grey</p>
            </div>
          </Link>
          <Link
            to={'/product/61e146faab1017275898f562'}
            onClick={() => window.scrollTo({ top: 0 })}
            style={{ textDecoration: 'none' }}
          >
            <div className='slider3__img-wrapper'>
              <img
                className='slider3__img'
                src='../slider/azure_res.jpg'
                alt=''
              />
              <p className='slider3__img-text'>700 Faded Azure</p>
            </div>
          </Link>
        </div>
        <p className='slider3__info-text'>Explore the YEEZY collection</p>
      </div>
    </animated.div>
  )
}

export default slider3
