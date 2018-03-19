import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import block from '../../../helpers/bem-cn'
import Nav from '../Nav/Nav'

import './Header.css'

const b = block('j-header')

const propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

const Header = ({ logout, user }) => {
  if (user) {
    return (
      <header className={b()}>
        <div className={b('col', { left: true })()}>
          <Link to='/'>
            <span className={b('logo')()} />
          </Link>
        </div>
        <div className={b('col', { middle: true })()}>
          <Nav />
        </div>
        <div className={b('col', { right: true })()}>
          {
            user &&
            <div className={b('user')()}>
              <div className={b('user-name')()}>
                {user}
                <div className={b('user-menu')()} onClick={logout}>Logout</div>
              </div>
            </div>
          }
        </div>
      </header>
    )
  }

  return (
    <header className={b()} />
  )
}

Header.propTypes = propTypes

export default Header
