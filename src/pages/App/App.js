import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import './App.css';
import HomePage from '../../pages/HomePage/HomePage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import AboutPage from '../../pages/AboutPage/AboutPage';

class App extends Component {
  state = {
    currentScore: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
    gamesPlayed: 0,
  }

  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <div class="nav-wrapper">
              <h1 class="brand-logo center"><NavLink exact to='/'>What Do YOU Know?</NavLink></h1>
              <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><NavLink exact to='/signup'>SIGNUP</NavLink></li>
                <li><NavLink exact to='/login'>LOGIN</NavLink></li>
                <li><NavLink exact to='/about'>ABOUT</NavLink></li>
              </ul>
            </div>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path='/' render={() =>
              <HomePage />
            } />
            <Route exact path='/signup' render={({ history }) => <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />} />
            <Route exact path='/login' render={({ history }) => <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />} />
            <Route exact path='/about' render={({ history }) => <AboutPage history={history} />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
