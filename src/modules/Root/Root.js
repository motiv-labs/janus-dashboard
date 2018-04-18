import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Route,
  Switch
} from 'react-router-dom'

import { ConnectedRouter } from 'react-router-redux'

import { getUserStatus, logout } from '../../store/actions'

import ROUTES from '../../configurations/routes.config'
import history from '../../store/configuration/history'

import Header from '../Layout/Header/Header'
import Footer from '../Layout/Footer/Footer'
import APIRespondModalContainer from '../modals/APIRespondModal/apiRespondModalContainer'
import Toaster from '../modals/Toaster/Toaster'
import ConfirmationModal from '../modals/ConfirmationModal/ConfirmationModal'
import ___ConfirmationModal from '../modals/ConfirmationModal/___ConfirmationModal'

import LoginPage from '../pages/LoginPage/LoginPage'
import HealthCheckPage from '../pages/HealthCheckPage/HealthCheckPage'
import OAuthServersPage from '../pages/OAuthServersPage/OAuthServersPage'
import OAuthServerPage from '../pages/OAuthServerPage/OAuthServerPage'
import NewOAuthServerPage from '../pages/NewOAuthServerPage/NewOAuthServerPage'
import ApiListPage from '../pages/ApiListPage/ApiListPage'
import NewApiPage from '../pages/NewApiPage/NewApiPage'
import EditApiPage from '../pages/EditPage/EditApiPage'
import AuthorizationCallback from '../pages/AuthorizationCallback/AuthorizationCallback'

import './Root.css'

class Root extends Component {
  componentDidMount () {
    this.props.getUserStatus()
  }

  render () {
    return (
      <ConnectedRouter history={history}>
        <div className='j-app'>
          <Header user={this.props.user} logout={this.props.logout} />
          <div className='j-pages'>
            <Switch>
              <Route exact path={ROUTES.MAIN.path} component={ApiListPage} />
              <Route path={ROUTES.GITHUB_AUTH.path} component={AuthorizationCallback} />
              <Route path={ROUTES.HEALTHCHECK.path} component={HealthCheckPage} />
              <Route path={ROUTES.NEW_OAUTH_SERVER.path} component={NewOAuthServerPage} />
              <Route path={ROUTES.OAUTH_SERVER.path} component={OAuthServerPage} />
              <Route path={ROUTES.OAUTH_SERVERS.path} component={OAuthServersPage} />
              <Route path={ROUTES.NEW.path} component={NewApiPage} />
              <Route path={ROUTES.LOGIN.path} component={LoginPage} />
              <Route path={ROUTES.EDIT.path} render={props => <EditApiPage {...props} />} />
            </Switch>
          </div>
          <Footer />
          <APIRespondModalContainer />
          <Toaster timeout='2000' />
          <ConfirmationModal />
          <___ConfirmationModal />
        </div>
      </ConnectedRouter>
    )
  };
};

const mapStateToProps = state => ({
  user: state.userSessionReducer.user
})

export default connect(
  mapStateToProps,
  { getUserStatus, logout }
)(Root)
