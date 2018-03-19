import React from 'react'
import PropTypes from 'prop-types'

import './Table.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

const Table = ({ children, className }) => (
  <table className={className}>
    { children }
  </table>
)

Table.propTypes = propTypes

export default Table
