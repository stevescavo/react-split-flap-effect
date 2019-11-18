import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FlapStack } from './FlapStack'
import { Presets } from './Presets'

const splitChars = v => v.split('').map(c => c.toUpperCase())

export const FlapDisplay = ({
  value,
  chars,
  words,
  timing,
  animationTiming,
  ...restProps
}) => {
  const [stack, setStack] = useState([])
  const [digits, setDigits] = useState([])

  useEffect(() => {
    if (words) {
      setStack(words)
    } else {
      setStack(splitChars(chars))
    }
  }, [chars, words])

  useEffect(() => {
    setDigits(words ? [value] : splitChars(value))
  }, [value])

  return (
    <div>
      {digits.map((digit, i) => (
        <FlapStack
          key={i}
          stack={stack}
          value={digit}
          timing={timing}
          animationTiming={animationTiming || timing}
          {...restProps}
        />
      ))}
    </div>
  )
}

FlapDisplay.defaultProps = {
  chars: Presets.NUM,
  timing: 150,
  width: 64,
  height: 100,
  color: 'black',
  backgroundColor: 'white'
}

FlapDisplay.propTypes = {
  value: PropTypes.string.isRequired,
  chars: PropTypes.string,
  words: PropTypes.arrayOf(PropTypes.string),
  timing: PropTypes.number,
  animationTiming: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  backgroundColor: PropTypes.string
}
