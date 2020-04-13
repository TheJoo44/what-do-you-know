import React, { Component } from "react";


class QuestionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: []
    }
  }

  state

  handleChange = (e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  render() {
    const questions = this.props.triviaResults.map((question, questionIdx) => {
      const answers = [...question.incorrect_answers, question.correct_answer]
      const choices = answers.map((choice, idx) => {
        return (
          <p><label>
            <input type="radio" name={`choices-${questionIdx}`} value={choice} onChange={this.handleChange} />
            <span>{choice}</span>
          </label></p>
        )
      })
      return (
        <div>
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
    return (
      <div>
        <h1>Questions</h1>
        {questions}
      </div >
    )
  }

}

export default QuestionList;