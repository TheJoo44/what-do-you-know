import React, { Component } from 'react';
import TriviaSelectionForm from '../../components/TriviaSelectionForm/TriviaSelectionForm'
import * as triviaAPI from '../../utils/triviaAPI'
import QuestionList from '../../components/QuestionList/QuestionList'

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numQuestions: '',
      category: '',
      difficulty: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.getTrivia(this.state)
  }

  render() {
    return (
      <div className="GamePage">
        <h1>Play Some Trivia</h1>
        {/* <TriviaSelectionForm
          // getNumQuestions={this.state.numQuestions}
          // getCategory={this.state.category}
          // getDifficulty={this.state.difficulty}
          getTrivia={this.props.getTrivia}
        /> */}
        <QuestionList
          triviaResults={this.props.triviaResults}
        />
        <button onClick={this.handleSubmit} className="btn btn-default">Start Game!</button>
      </div>
    )
  }
}

export default GamePage;