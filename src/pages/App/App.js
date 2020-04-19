import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import HomePage from '../../pages/HomePage/HomePage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import AboutPage from '../../pages/AboutPage/AboutPage';
import GamePage from '../../pages/GamePage/GamePage';
import QuestionList from '../../components/QuestionList/QuestionList';
import Score from '../../components/Score/Score';
import userService from '../../utils/userService';
import * as triviaService from '../../utils/triviaService';
import * as triviaAPI from '../../utils/triviaAPI';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentScore: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
      totalGames: 0,
      triviaResults: [],
      userAnswers: [],
      answers: [],
      questions: [],
      correctAnswers: {},
      user: userService.getUser()
    }
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null }, () => this.props.history.push('/'));
  }

  handleSignupOrLogin = () => {
    const user = userService.getUser()
    this.setState({
      user,
      totalGames: user.totalGames,
      totalCorrect: user.totalCorrect,
      totalIncorrect: user.totalIncorrect
    });
  }

  handleCurrentScore = async (correct, totalGames, totalCorrect, totalIncorrect, questions, checked) => {
    let results = {
      totalGames: totalGames,
      totalCorrect: totalCorrect,
      totalIncorrect: totalIncorrect
    }
    let savedResults = await userService.saveResults(results)
    this.setState({
      currentScore: correct,
      userAnswers: checked,
      questions: questions,
      totalGames: savedResults.totalGames,
      totalCorrect: savedResults.totalCorrect,
      totalIncorrect: savedResults.totalIncorrect
    })
    this.props.history.push('/scores')
  }

  getTrivia = async (formData) => {
    console.log("FORM DATA", formData)
    const triviaResults = await triviaAPI.getTrivia(formData)
    const results = triviaService.shuffleAnswers(triviaResults)
    const correctAnswers = triviaService.correctAnswers(triviaResults)
    this.setState({ triviaResults: results.results, correctAnswers })
  }

  render() {
    return (
      <div className="App main-app">
        <header>
          <nav className="app-header deep-orange lighten-1">
            {userService.getUser() ?
              <div className="nav-wrapper">
                <h1 className="brand-logo center"><NavLink exact to='/trivia'>What Do YOU Know?</NavLink></h1>
                <div className="left username">
                  <span>{userService.getUser().name ? `Hello, ${userService.getUser().username}` : ''}</span>
                </div>
                <ul id="nav-mobile" className="right">
                  <li><NavLink exact to='/'>HOME</NavLink></li>
                  <li><NavLink exact to='/trivia'>PLAY</NavLink></li>
                  <li><NavLink exact to='/about'>ABOUT</NavLink></li>
                  <li><NavLink exact to='/logout' onClick={this.handleLogout}>LOGOUT</NavLink></li>
                </ul>
              </div>
              :
              <div className="nav-wrapper">
                <h1 className="brand-logo center"><NavLink exact to='/'>What Do YOU Know?</NavLink></h1>
                <ul id="nav-mobile" className="right">
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
            <Route exact path='/' render={({ history }) => <HomePage history={history} />}
            />
            <Route exact path='/trivia' render={({ history }) => <GamePage
              history={history}
              getTrivia={this.getTrivia}
              triviaResults={this.state.triviaResults}
              handleSettings={this.handleSettings}
              user={this.state.user} />}
            />
            <Route exact path='/questions' render={({ history }) => <QuestionList
              handleCurrentScore={this.handleCurrentScore}
              history={history}
              correctAnswers={this.state.correctAnswers}
              triviaResults={this.state.triviaResults}
              totalGames={this.state.totalGames}
              totalCorrect={this.state.totalCorrect}
              totalIncorrect={this.state.totalIncorrect}
              user={this.state.user} />}
            />
            <Route exact path='/scores' render={({ history }) => <Score
              questions={this.state.triviaResults}
              score={this.state.currentScore}
              userAnswers={this.state.userAnswers}
              history={history}
              user={this.state.user} />}
            />
          </Switch>
        </main>
        {userService.getUser() ?
          <footer className="page-footer footer deep-orange lighten-1">
            <div className="container center footer-text">
              <span>Total Games Played: {this.state.totalGames}</span>
              <span>Total Correct Answers: {this.state.totalCorrect}</span>
              <span>Total Incorrect Answers: {this.state.totalIncorrect}</span>
            </div>
          </footer>
          :
          <footer className="page-footer footer deep-orange lighten-1">
            <div className="container center footer-text">
            </div>
          </footer>
        }
      </div >
    );
  }
}
export default App;
