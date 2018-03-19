import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import block from '../../../helpers/bem-cn'
import isNoSearchResults from '../../../helpers/isNoSearchResults'

import Correct from './Correct'
import PaginatedList from '../../PaginatedList/PaginatedList'
import Preloader from '../../../components/Preloader/Preloader'
import NoSearchResults from '../../../components/NoSearchResults/NoSearchResults'
import Icon from '../../../components/Icon/Icon'

import './HealthCheckList.css'

const b = block('j-healthcheck')
const table = block('j-table')

const propTypes = {
  clearHealthCheckDetails: PropTypes.func.isRequired,
  currentPageIndex: PropTypes.number.isRequired,
  fetchHealthCheckList: PropTypes.func.isRequired,
  fetchHealthCheckItem: PropTypes.func.isRequired,
  healthcheckList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAscendingFilter: PropTypes.func.isRequired,
  setCurrentPageIndex: PropTypes.func.isRequired,
  setSortingFilter: PropTypes.func.isRequired
}

class HealthCheckList extends PureComponent {
  componentDidMount () {
    this.props.fetchHealthCheckList()
  }

    handleShowDetails = name => {
      this.props.fetchHealthCheckItem(name)
    }

    renderRows = list => list.map(item => (
      <div className={table('row')()} key={item.name}>
        <div className={table('td', { name: true })()}>
          <Link to={`/${item.name}`}>
            {item.name}
          </Link>
        </div>
        <div className={table('td')()}>{item.description}</div>
        <div className={table('td')()} />
        <div className={table('td').mix(table('controls'))()}>
          <Link to={`/${item.name}`}>
            <Icon type='edit' />
          </Link>
        </div>
      </div>
    ));

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
            <div className={table('th')()}>Description</div>
          </div>
        </div>
        <div className={table('tbody')()}>
          { this.renderRows(list) }
        </div>
      </div>
    );

    render () {
      const {
        currentPageIndex,
        healthcheckList,
        searchQuery,
        setCurrentPageIndex,
        status
      } = this.props

      if (status) {
        return <Correct className={b('correct')()} />
      }

      if (healthcheckList.length > 0) {
        return (
          <PaginatedList
            list={healthcheckList}
            currentPageIndex={currentPageIndex}
            changePageIndex={setCurrentPageIndex}
            renderChildren={this.renderTable}
          />
        )
      }

      if (isNoSearchResults(searchQuery)) {
        return <NoSearchResults />
      }

      return <Preloader />
    }
};

HealthCheckList.propTypes = propTypes

export default HealthCheckList
