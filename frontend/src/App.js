import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import PostsPage from './pages/Posts';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {!this.state.token && <Redirect from="/" to="/auth" exact />}
                {this.state.token && <Redirect from="/" to="/posts" exact />}
                {this.state.token && <Redirect from="/auth" to="/posts" exact />}
                {!this.state.token && (
                  <Route path="/auth" component={AuthPage} />
                )}
                <Route path="/posts" component={PostsPage} />
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
