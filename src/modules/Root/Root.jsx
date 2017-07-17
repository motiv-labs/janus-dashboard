import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';

import Nav from '../Layout/Nav/Nav';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';
import APIRespondModalContainer from '../modals/APIRespondModal/apiRespondModalContainer';

import ApiListPage from '../pages/ApiListPage/ApiListPage';
import NewApiPage from '../pages/NewApiPage/NewApiPage';
import EditApiPage from '../pages/EditPage/EditApiPage';

import './Root.css';

class Root extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Header>
            <NavLink exact to="/" className="nav-item">API List</NavLink>
            <NavLink to="/new" className="nav-item">New API</NavLink>
          </Header>

					<div className="Pages">
            <Switch>
              <Route exact path="/" component={ApiListPage}/>
              <Route path="/new" component={NewApiPage}/>
              <Route path="/:name" component={EditApiPage}/>
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
