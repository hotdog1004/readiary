import React, { forwardRef } from 'react'
import { RangeWrapper, Track, StyledRange, ValueDisplay } from './styles'
import type { RangeProps } from './types'

const Range = forwardRef<HTMLInputElement, RangeProps>(
  (
    { value, onChange, min = 0, max = 100, step = 1, showValue = true, valueLabel, ...rest },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      onChange(newValue)
    }
    const progress = ((value - min) / (max - min)) * 100
    const displayValue = valueLabel ? valueLabel(value) : value.toString()

    return (
      <RangeWrapper>
        <div style={{ position: 'relative', flex: 1 }}>
          <Track $progress={progress} />
          <StyledRange
            ref={ref}
            type="range"
            value={value}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            {...rest}
          />
        </div>
        {showValue && <ValueDisplay>{displayValue}</ValueDisplay>}
      </RangeWrapper>
    )
  },
)

Range.displayName = 'Range'

export default Range
