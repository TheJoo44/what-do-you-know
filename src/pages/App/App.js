import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
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
      totalCorrect: user.totalCorrect
    });
  }

  handleCurrentScore = async (correct, totalGames, totalCorrect, questions, checked) => {
    console.log('=================')
    let results = {
      totalGames: totalGames,
      totalCorrect: totalCorrect
    }
    console.log("results: ", results)
    let savedResults = await userService.saveResults(results)
    console.log("SavedResults: ", savedResults)
    this.setState({
      currentScore: correct,
      userAnswers: checked,
      questions: questions,
      totalGames: savedResults.totalGames,
      totalCorrect: savedResults.totalCorrect
    })
    this.props.history.push('/scores')
  }

  getTrivia = async (formData) => {
    const triviaResults = await triviaAPI.getTrivia(formData)
    return (triviaResults)
  }



  render() {
    return (
      <div className="App">
        <header>
          <nav>
            {userService.getUser() ?
              <div className="nav-wrapper">
                <h1 className="brand-logo center"><NavLink exact to='/trivia'>What Do YOU Know?</NavLink></h1>
                <div className="left">
                  <span>{userService.getUser().name ? `Hello, ${userService.getUser().username}` : ''}</span>
                  <span>{`Total Games Played: ${this.state.totalGames}`}</span>
                  <span>{`Total Correct Answers: ${this.state.totalCorrect}`}</span>
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
              triviaResults={this.state.triviaResults}
              user={this.state.user} />}
            />
            <Route exact path='/questions' render={({ history }) => <QuestionList
              handleCurrentScore={this.handleCurrentScore}
              history={history}
              getTrivia={this.getTrivia}
              triviaResults={this.state.triviaResults}
              totalGames={this.state.totalGames}
              totalCorrect={this.state.totalCorrect}
              user={this.state.user} />}
            />
            <Route exact path='/scores' render={({ history }) => <Score
              questions={this.state.questions}
              score={this.state.currentScore}
              userAnswers={this.state.userAnswers}
              history={history}
              user={this.state.user} />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}
export default App;
