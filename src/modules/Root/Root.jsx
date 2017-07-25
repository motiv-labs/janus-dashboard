import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import ROUTES from '../../configurations/routes.config';

import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';
import APIRespondModalContainer from '../modals/APIRespondModal/apiRespondModalContainer';

import LoginPage from '../pages/LoginPage/LoginPage';
import ApiListPage from '../pages/ApiListPage/ApiListPage';
import NewApiPage from '../pages/NewApiPage/NewApiPage';
import EditApiPage from '../pages/EditPage/EditApiPage';

class Root extends Component {
  render() {
    return (
      <Router>
        <div className="j-app">
          <Header />

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
