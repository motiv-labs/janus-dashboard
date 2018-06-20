import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store/configuration'

import Root from './modules/Root/Root'

import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>, document.getElementById('root'))
