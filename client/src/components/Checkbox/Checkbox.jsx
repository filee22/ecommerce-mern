import './_checkbox.scss'
import React, { useState } from 'react'
import { Check } from '@material-ui/icons'

const Checkbox = () => {
  const [tick, setTick] = useState(false)

  const handleCheck = () => {
    setTick((prev) => !prev)
  }

  return (
    <div
      className='checkbox__container'
      style={{ background: tick ? 'salmon' : 'papayawhip' }}
      onClick={handleCheck}
    >
      <Check style={{ width: tick ? 16 : 0 }} />
    </div>
  )
}

export default Checkbox
