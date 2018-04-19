import React, { PureComponent } from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'

import block from '../../../helpers/bem-cn'
import isNoSearchResults from '../../../helpers/isNoSearchResults'
import ROUTES from '../../../configurations/routes.config'

import PaginatedList from '../../PaginatedList/PaginatedList'
import Control from '../../../components/Control/Control'
import Icon from '../../../components/Icon/Icon'
import Preloader from '../../../components/Preloader/Preloader'
import NoSearchResults from '../../../components/NoSearchResults/NoSearchResults'

import '../../Layout/Table/Table.css'

const propTypes = {
  currentPageIndex: PropTypes.number.isRequired,
  fetchOAuthServers: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  oAuthServers: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAscendingFilter: PropTypes.func.isRequired,
  setCurrentPageIndex: PropTypes.func.isRequired,
  setSortingFilter: PropTypes.func.isRequired,
  confirmAction: PropTypes.func.isRequired
}

const table = block('j-table')

class OAuthServersList extends PureComponent {
  componentDidMount () {
    this.props.fetchOAuthServers()
  }

  handleDelete = serverName => this.props.confirmAction('delete', 'OAuthServer', serverName)

  getTokenUrl = pathArray => target => {
    const pathToTockenUrl = R.lensPath(pathArray)

    return R.view(pathToTockenUrl, target)
  }

  renderRows = list => list.map((server, index) => (
    <div className={table('row')()} key={`${index}-${server.name}`}>
      <div className={table('td', {name: true})()}>{server.name}</div>
      <div className={table('td', {name: true})()} />
      <div className={table('td', {name: true})()} />
      <div className={table('td').mix(table('controls'))()}>
        <Link to={`${ROUTES.OAUTH_SERVERS.path}/${server.name}`} className={table('controls-item')()}>
          <Icon type='edit' ariaLabel='Edit' />
        </Link>
        {
          this.props.isAdmin &&
          <Control
            className={table('controls-item')()}
            icon='delete'
            onClick={() => {
              this.handleDelete(server.name)
            }}
          />
        }
      </div>
    </div>
  ))

  sortList = filter => {
    this.props.setSortingFilter(filter)
    this.props.setAscendingFilter()
  }

  renderTable = list => (
    <div className={table()}>
      <div className={table('head')()}>
        <div className={table('row')()}>
          <div
            className={table('th').mix('ascending-container')()}
            onClick={() => this.sortList('name')}
          >
            <div>OAuth Server Name</div>
            <div className='ascending-icon' />
          </div>
        </div>
      </div>
      <div className={table('tbody')()}>
        { this.renderRows(list) }
      </div>
    </div>
  )

  render () {
    if (this.props.oAuthServers.length > 0) {
      return (
        <PaginatedList
          list={this.props.oAuthServers}
          currentPageIndex={this.props.currentPageIndex}
          changePageIndex={this.props.setCurrentPageIndex}
          renderChildren={this.renderTable}
        />
      )
    }

    if (isNoSearchResults(this.props.searchQuery)) {
      return <NoSearchResults />
    }

    return <Preloader />
  }
}

OAuthServersList.propTypes = propTypes

export default OAuthServersList
