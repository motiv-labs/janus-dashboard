import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'

import block from '../../../helpers/bem-cn'

import PaginatedList from '../../PaginatedList/PaginatedList'
import Button from '../../../components/Button/Button'
import Icon from '../../../components/Icon/Icon'
import Control from '../../../components/Control/Control'
import Preloader from '../../../components/Preloader/Preloader'
import NoSearchResults from '../../../components/NoSearchResults/NoSearchResults'

import JSONmodal from '../../modals/JSONmodal/JSONmodal'

import '../../Layout/Table/Table.css'

const propTypes = {
  apiList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  currentPageIndex: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  setCurrentPageIndex: PropTypes.func.isRequired,
  fetchEndpoints: PropTypes.func.isRequired,
  refreshEndpoints: PropTypes.func.isRequired,
  setSortingFilter: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  confirmAction: PropTypes.func.isRequired
}

const table = block('j-table')

class ApiList extends PureComponent {
  state = {
    showJSONmodal: false,
    JSONmodalContent: {}
  }

  componentDidMount () {
    this.props.fetchEndpoints()
  }

    isOauthEnabled = (plugins) => {
    // @TODO: find why
    // if (typeof this.isProtected !== 'undefined') {
    //   return this.isProtected;
    // }
      const oauth = plugins.find(plugin => plugin.name.indexOf('oauth2') > -1)

      return !!oauth && !!oauth.enabled
    }

    handleDelete = api => {
      this.props.confirmAction('delete', 'endpoint', api.name)
    };

    handleCloseModal = () => this.setState({
      showJSONmodal: false,
      JSONmodalContent: {}
    })

    handleCopyAsJSON = api => this.setState({
      showJSONmodal: true,
      JSONmodalContent: api
    })

    renderRows = list => list.map((api, index) => (
      <div className={table('row')()} key={`${index}-${api.name}`}>
        <div className={table('td', {name: true})()}>{api.name}</div>
        <div className={table('td')()}>{api.proxy.listen_path}</div>
        <div className={table('td', {active: true})()}>
          {api.active ? <Icon type='checked' /> : null}
        </div>
        <div className={table('td').mix(table('controls'))()}>
          <Link to={`/preview/${api.name}`} className={table('controls-item')()}>
            <Icon type='view' ariaLabel='View' />
          </Link>
          <Link to={`/${api.name}`} className={table('controls-item')()}>
            <Icon type='edit' ariaLabel='Edit' />
          </Link>
          <Link
            to={{
              pathname: '/new',
              state: {
                clone: api
              }
            }}
            className={table('controls-item')()}
          >
            <Icon type='copy' ariaLabel='Copy' />
          </Link>
          <Button
            mod='primary'
            type='button'
            size='small'
            onClick={() => {
              this.handleCopyAsJSON(api)
            }}
          >
            Copy as JSON
          </Button>
          {
            this.props.isAdmin &&
            <Control
              className={table('controls-item')()}
              icon='delete'
              onClick={() => {
                this.handleDelete(api)
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
              <div>Api Name</div>
              <div className='ascending-icon' />
            </div>
            <div className={table('th')()}>Listen Path</div>

            <div
              className={table('th', {active: true}).mix('ascending-container')()}
              onClick={() => this.sortList('active')}
            >
              <div>Active</div>
              <div className='ascending-icon' />
            </div>
            <div className={table('th')()} />
          </div>
        </div>
        <div className={table('tbody')()}>
          { this.renderRows(list) }
        </div>
        <JSONmodal
          show={this.state.showJSONmodal}
          message={this.state.JSONmodalContent}
          closeModal={this.handleCloseModal}
        />
      </div>
    )

    render () {
      if (this.props.apiList.length > 0) {
        return (
          <PaginatedList
            list={this.props.apiList}
            currentPageIndex={this.props.currentPageIndex}
            changePageIndex={this.props.setCurrentPageIndex}
            renderChildren={this.renderTable}
          />
        )
      }

      if (this.props.apiList.isFetching) {
        return <Preloader />
      } else {
        return <NoSearchResults />
      }
    }
}

ApiList.propTypes = propTypes

export default ApiList
