import React, { PureComponent } from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';

import block from '../../../helpers/bem-cn';
import ROUTES from '../../../configurations/routes.config';

import Table from '../../Layout/Table/Table';
import PaginatedList from '../../PaginatedList/PaginatedList';
import Icon from '../../Icon/Icon';
import Preloader from '../../Preloader/Preloader';

import '../../Layout/Table/Table.css';

const propTypes = {
    currentPageIndex: PropTypes.number.isRequired,
    deleteOAuthServer: PropTypes.func.isRequired,
    fetchOAuthServers: PropTypes.func.isRequired,
    oAuthServers: PropTypes.arrayOf(PropTypes.object).isRequired,
    refreshOAuthServers: PropTypes.func.isRequired,
    setAscendingFilter: PropTypes.func.isRequired,
    setCurrentPageIndex: PropTypes.func.isRequired,
    setSortingFilter: PropTypes.func.isRequired,
};

const table = block('j-table');

class OAuthServersList extends PureComponent {
    componentDidMount() {
        this.props.fetchOAuthServers();
    }

    handleDelete = serverName => {
        this.props.deleteOAuthServer(serverName, this.props.refreshOAuthServers);
    };

    getTokenUrl = pathArray => target => {
        const pathToTockenUrl = R.lensPath(pathArray);

        return R.view(pathToTockenUrl, target);
    }

    renderRows = list => list.map((server, index) => {
        const tokenUrl = this.getTokenUrl(
            ['oauth_endpoints','token','upstream_url']
        )(server);

        return (
            <div className={table('row')} key={`${index}-${server.name}`}>
                <div className={table('td', {name: true})}>{server.name}</div>
                <div className={table('td', {name: true})}>{tokenUrl}</div>
                <div className={table('td', {name: true})}></div>
                <div className={table('td', {name: true})}></div>
                <div className={table('td').mix(table('controls'))}>
                    {/*<Link to={`${ROUTES.OAUTH_SERVERS.path}/${server.name}`} className={table('controls-item')}>
                        <Icon type="edit" ariaLabel="Edit" />
                    </Link>*/}
                    {/*<Link
                        to={'/oauth/servers'}
                        className={table('controls-item')}
                        onClick={() => {
                            this.handleDelete(server.name);
                        }}
                    >
                        <Icon type="delete" ariaLabel="Delete" />
                    </Link>*/}
                </div>
            </div>
        );
    })

    sortList = filter => {
        this.props.setSortingFilter(filter);
        this.props.setAscendingFilter();
    }

    renderTable = list => (
        <div className={table()}>
            <div className={table('head')}>
                <div className={table('row')}>
                    <div
                        className={table('th').mix('ascending-container')}
                        onClick={() => this.sortList('name')}
                    >
                        <div>oAuth Server Name</div>
                        <div className="ascending-icon"></div>
                    </div>
                    <div className={table('th')}>Upstream URL</div>
                </div>
            </div>
            <div className={table('tbody')}>
                { this.renderRows(list) }
            </div>
        </div>
    )

    render() {
        if (this.props.oAuthServers.length > 0) {
            return (
                <PaginatedList
                    list={this.props.oAuthServers}
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

OAuthServersList.propTypes = propTypes;

export default OAuthServersList;
