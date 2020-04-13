import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import HomePage from '../../pages/HomePage/HomePage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import AboutPage from '../../pages/AboutPage/AboutPage';
import GamePage from '../../pages/GamePage/GamePage';
import userService from '../../utils/userService';
import * as triviaAPI from '../../utils/triviaAPI';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentScore: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
      gamesPlayed: 0,
      triviaResults: [],
      user: userService.getUser()
    }
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null }, () => this.props.history.push('/'));
  }

  handleSignupOrLogin = () => {
    this.setState({
      user: userService.getUser()
    });
  }

  getTrivia = async (formData) => {
    const triviaResults = await triviaAPI.getTrivia(formData)
    console.log(triviaResults)
    this.setState({
      triviaResults: triviaResults.results
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <nav>
            {userService.getUser() ?
              <div className="nav-wrapper">
                <h1 className="brand-logo center"><NavLink exact to='/'>What Do YOU Know?</NavLink></h1>
                <div className="left">
                  {userService.getUser().name ? `Hello, ${userService.getUser().username}` : ''}
                </div>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><NavLink exact to='/about'>ABOUT</NavLink></li>
                  <li><NavLink exact to='/logout' onClick={this.handleLogout}>LOGOUT</NavLink></li>
                </ul>
              </div>
              :
              <div className="nav-wrapper">
                <h1 className="brand-logo center"><NavLink exact to='/'>What Do YOU Know?</NavLink></h1>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><NavLink exact to='/signup'>SIGNUP</NavLink></li>
                  <li><NavLink exact to='/login'>LOGIN</NavLink></li>
                  <li><NavLink exact to='/about'>ABOUT</NavLink></li>
                </ul>
              </div>
            }
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
            <Route exact path='/trivia' render={({ history }) => <GamePage
              history={history}
              getTrivia={this.getTrivia}
              triviaResults={this.state.triviaResults} />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
