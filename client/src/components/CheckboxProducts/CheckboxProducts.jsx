import './_checkboxProducts.scss'
import React, { useState } from 'react'
import { Check } from '@material-ui/icons'

const CheckboxProducts = (props) => {
  const [tick, setTick] = useState(false)

  const handleCheck = () => {
    setTick((prev) => !prev)
    !tick
      ? props.setFilter([...props.filter, props.product])
      : props.setFilter(props.filter.filter((e) => e !== props.product))
  }

  return (
    <div className='checkbox-products__container' onClick={handleCheck}>
      <div
        className='checkbox-products_background'
        style={{ background: tick ? 'salmon' : 'rgb(230, 230, 230)' }}
      >
        <Check style={{ width: tick ? 16 : 0 }} />
      </div>
      <div className='checkbox-products_label' style={{ marginLeft: 10 }}>
        {props.product}
      </div>
    </div>
  )
}

export default CheckboxProducts
