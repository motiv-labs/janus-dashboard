import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired
}

const MultiSelect = ({ input, options, ...props }) => {
  const handleChange = value => {
    input.onChange(value.split(','))
  }

  return (
    <Select
      {...props}
      multi
      simpleValue
      className='j-select'
      value={input.value}
      placeholder='Choose one or more methods'
      options={options}
      onChange={handleChange}
      onBlur={() => input.onBlur(input.value)}
    />
  )
}

MultiSelect.propTypes = propTypes

export default MultiSelect
