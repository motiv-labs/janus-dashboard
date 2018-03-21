import React from 'react'

import block from '../../helpers/bem-cn'
import copyToClipboard from '../../helpers/copyToClipboard'

import './CopyToClipboard.css'

const cn = block('copy-to-clipboard')

const CopyToClipboard = ({ children, value }) => (
  <div className={cn()}>
    <span
      className={cn('control')()}
      onClick={() => copyToClipboard(value)}
    >
      Copy to clipboard
    </span>
    { children }
  </div>
)

export default CopyToClipboard
