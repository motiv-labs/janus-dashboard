import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';

import ROUTES from '../../configurations/routes';

import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';
import APIRespondModalContainer from '../modals/APIRespondModal/apiRespondModalContainer';

import LoginPage from '../pages/LoginPage/LoginPage';
import ApiListPage from '../pages/ApiListPage/ApiListPage';
import NewApiPage from '../pages/NewApiPage/NewApiPage';
import EditApiPage from '../pages/EditPage/EditApiPage';

import block from '../../helpers/bem-cn';

const nav = block('j-header__nav-item');

class Root extends Component {
  render() {
    return (
      <Router>
        <div className="j-app">
          <Header>
            <NavLink exact to={ROUTES.MAIN} className={nav()} activeClassName={nav({active: true})()}>API Definitions</NavLink>
            <NavLink to={ROUTES.NEW} className={nav()} activeClassName={nav({active: true})()}>New API</NavLink>
            <NavLink to={ROUTES.LOGIN} className={nav()} activeClassName={nav({active: true})()}>Login Page</NavLink>
          </Header>

          <div className="j-pages">
            <Switch>
              <Route exact path={ROUTES.MAIN} component={ApiListPage}/>
              <Route path={ROUTES.NEW} component={NewApiPage}/>
              <Route path={ROUTES.LOGIN} component={LoginPage}/>
              <Route path={ROUTES.EDIT} render={(props) => <EditApiPage {...props} />}/>
            </Switch>
          </div>

          <Footer />

          <APIRespondModalContainer />
        </div>
      </Router>
    );
  }
}

export default Root;
