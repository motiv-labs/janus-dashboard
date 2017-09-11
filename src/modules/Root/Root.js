import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Route,
    Switch,
} from 'react-router-dom';

import { ConnectedRouter } from 'react-router-redux';

import { getUserStatus } from '../../store/actions';

import ROUTES from '../../configurations/routes.config';
import history from '../../store/configuration/history';

import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';
import APIRespondModalContainer from '../modals/APIRespondModal/apiRespondModalContainer';

import LoginPage from '../pages/LoginPage/LoginPage';
import HealthCheckPage from '../pages/HealthCheckPage/HealthCheckPage';
import ApiListPage from '../pages/ApiListPage/ApiListPage';
import NewApiPage from '../pages/NewApiPage/NewApiPage';
import EditApiPage from '../pages/EditPage/EditApiPage';
import AuthorizationCallback from '../pages/AuthorizationCallback/AuthorizationCallback';

import './Root.css';

class Root extends Component {
    componentDidMount() {
        console.error('ROOT COMPONENT DID MOUNT');

        this.props.getUserStatus();
    }

    render() {
        return (
            <ConnectedRouter history={history}>
                <div className="j-app">
                    <Header logged={this.props.logged} />
                    <div className="j-pages">
                        <Switch>
                            <Route exact path={ROUTES.MAIN.path} component={ApiListPage} />
                            <Route path={ROUTES.GITHUB_AUTH.path} component={AuthorizationCallback} />
                            <Route path={ROUTES.HEALTHCHECK.path} component={HealthCheckPage} />
                            <Route path={ROUTES.NEW.path} component={NewApiPage} />
                            <Route path={ROUTES.LOGIN.path} component={LoginPage} />
                            <Route path={ROUTES.EDIT.path} render={props => <EditApiPage {...props} />} />
                        </Switch>
                    </div>
                    <Footer />
                    <APIRespondModalContainer />
                </div>
            </ConnectedRouter>
        );
    };
};

const mapStateToProps = state => ({
    logged: state.userSessionReducer.logged,
});

export default connect(
    mapStateToProps,
    { getUserStatus },
)(Root);
