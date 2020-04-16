import React, { Component } from "react";
import './QuestionList.css'


class QuestionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: {},
      questions: [],
      correctAnswers: {},
    }
  }

  handleChange = (e) => {
    this.setState({
      checked: {
        ...this.state.checked,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let correct = 0;
    let incorrect = 0;
    let totalGames = this.props.totalGames;
    let totalCorrect = this.props.totalCorrect;
    let totalIncorrect = this.props.totalIncorrect;
    for (let key in this.state.checked) {
      if (this.state.checked[key] === this.props.correctAnswers[key]) {
        correct++
      } else {
        incorrect++
      }
    }
    totalGames++
    totalCorrect = totalCorrect += correct
    totalIncorrect = totalIncorrect += incorrect
    this.props.handleCurrentScore(correct, totalGames, totalCorrect, totalIncorrect, this.state.questions, this.state.checked)
  }

  // async componentDidMount(formData) {
  //   // let result = await this.props.getTrivia(formData);
  //   // triviaService.shuffleAnswers(result)
  //   // const correctAnswers = triviaService.correctAnswers(result)
  //   // this.setState({
  //     // questions: result.results,
  //     correctAnswers
  //   })
  // }

  render() {
    return (
      <div className="question-list">
        <h1>Questions</h1>
        {this.props.triviaResults ? this.props.triviaResults.map((question, questionIdx) => {
          const choices = question.answers.map((choice, idx) => {
            return (
              <p key={idx}><label>
                <input type="radio" name={`checked-${questionIdx}`} value={choice} onChange={this.handleChange} className="with-gap" />
                <span dangerouslySetInnerHTML={{ __html: `${choice}` }}></span>
              </label></p>
            )
          })
          return (
            <div key={questionIdx}>
              <h3 dangerouslySetInnerHTML={{ __html: `Category: ${question.category}` }}></h3>
              <h5 dangerouslySetInnerHTML={{ __html: `Difficulty: ${question.difficulty}` }}></h5>
              <h3 dangerouslySetInnerHTML={{ __html: `${question.question}` }}></h3>
              <form>
                {choices}
              </form>
              <br />
              <br />
            </div >
          )
        })
          : null}
        <button type="submit" onClick={this.handleSubmit} className="btn btn-default">Submit Answers</button>
      </div >
    )

  }
}

export default QuestionList;