import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';

import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';
import APIRespondModalContainer from '../modals/APIRespondModal/apiRespondModalContainer';

import LoginPage from '../pages/LoginPage/LoginPage';
import ApiListPage from '../pages/ApiListPage/ApiListPage';
import NewApiPage from '../pages/NewApiPage/NewApiPage';
import EditApiPage from '../pages/EditPage/EditApiPage';

import block from '../../helpers/bem-cn';

import { navClassName } from '../Layout/Nav/Nav';

const nav = block(navClassName('item')()); 

class Root extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header>
            <NavLink exact to="/" className={nav()} activeClassName={nav({active: true})()}>API Definitions</NavLink>
            <NavLink to="/new" className={nav()} activeClassName={nav({active: true})()}>New API</NavLink>
            <NavLink to="/login" className={nav()} activeClassName={nav({active: true})()}>Login Page</NavLink>
          </Header>

          <div className="Pages">
            <Switch>
              <Route exact path="/" component={ApiListPage}/>
              <Route path="/new" component={NewApiPage}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/:name" render={(props) => <EditApiPage {...props} />}/>
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
