import React from 'react'

import InfoPanel from '../InfoPanel/InfoPanel'

const style = {
  fontSize: 50,
  fontWeight: 300
}

const SadFace = () => <p style={style}>&#9785;</p>

const NoSearchResults = () => <InfoPanel
  icon={SadFace()}
  text='Nothing found'
/>

export default NoSearchResults
