import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';

import block from '../../../helpers/bem-cn';

import Table from '../../Layout/Table/Table';
import PaginatedList from '../../PaginatedList/PaginatedList';
import Icon from '../../Icon/Icon';
import Preloader from '../../Preloader/Preloader';

import '../../Layout/Table/Table.css';

const propTypes = {
    apiList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    currentPageIndex: PropTypes.number.isRequired,
    setCurrentPageIndex: PropTypes.func.isRequired,
    deleteEndpoint: PropTypes.func.isRequired,
    fetchEndpoints: PropTypes.func.isRequired,
    refreshEndpoints: PropTypes.func.isRequired,
};

const table = block('j-table');

class ApiList extends PureComponent {
    componentDidMount() {
        this.props.fetchEndpoints();
    }

    isOauthEnabled = (plugins) => {
    // @TODO: find why
    // if (typeof this.isProtected !== 'undefined') {
    //   return this.isProtected;
    // }
        const oauth = plugins.find(plugin => plugin.name.indexOf('oauth2') > -1);

        return !!oauth && !!oauth.enabled;
    }

    handleDelete = (apiName) => {
        this.props.deleteEndpoint(apiName, this.props.refreshEndpoints);
    };

    renderRows = list => list.map((api, index) => (
        <div className={table('row')} key={`${index}-${api.name}`}>
            <div className={table('td', {name: true})}>{api.name}</div>
            <div className={table('td')}>{api.proxy.listen_path}</div>
            <div className={table('td')}>{api.proxy.upstream_url}</div>
            <div className={table('td', {active: true})}>
                {api.active ? <Icon type="checked" /> : null}
            </div>
            <div className={table('td')}>
                <div className={table('controls')}>
                    <Link to={`/${api.name}`} className={table('controls-item')}>
                        <Icon type="edit" />
                    </Link>
                    <Link
                        to={{
                            pathname: '/new',
                            state: {
                                clone: api,
                            },
                        }}
                        className={table('controls-item')}
                    >
                        <Icon type="copy" />
                    </Link>
                    <Link
                        to={''}
                        className={table('controls-item')}
                        onClick={() => {
                            this.handleDelete(api.name);
                        }}
                    >
                        <Icon type="delete" />
                    </Link>
                </div>
            </div>
        </div>
    ))

    renderTable = list => (
        <div className={table()}>
            <div className={table('head')}>
                <div className={table('row')}>
                    <div className={table('th')}><div>Api Name</div></div>
                    <div className={table('th')}>Listen Path</div>
                    <div className={table('th')}>Upstream URL</div>
                    <div className={table('th', {active: true})}>Active</div>
                    <div className={table('th')} />
                </div>
            </div>
            <div className={table('tbody')}>
                { this.renderRows(list) }
            </div>
        </div>
    )

    render() {
        if (this.props.apiList.length > 0) {
            return (
                <PaginatedList
                    list={this.props.apiList}
                    itemsPerPage={10}
                    currentPageIndex={this.props.currentPageIndex}
                    changePageIndex={this.props.setCurrentPageIndex}
                    maximumVisiblePaginators={3}
                    renderChildren={this.renderTable}
                />
            );
        }

        return <Preloader />;
    }
}

ApiList.propTypes = propTypes;

export default ApiList;
