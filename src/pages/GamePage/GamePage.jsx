import React, { Component } from 'react';
import TriviaSelectionForm from '../../components/TriviaSelectionForm/TriviaSelectionForm'

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numQuestions: '',
      category: '',
      difficulty: ''
    }
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   // getNumQuestions = { this.state.numQuestions }
  //   // getCategory = { this.state.category }
  //   // getDifficulty = { this.state.difficulty }
  //   this.props.getTrivia(this.state)
  // }

  render() {
    return (
      <div className="GamePage">
        <TriviaSelectionForm
          getNumQuestions={this.state.numQuestions}
          getCategory={this.state.category}
          getDifficulty={this.state.difficulty}
          getTrivia={this.props.getTrivia}
          history={this.props.history}
          handleSettings={this.props.handleSettings}
        />

      </div>
    )
  }
}

export default GamePage;