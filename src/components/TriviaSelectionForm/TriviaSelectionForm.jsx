import React, { Component } from 'react';
import './TriviaSelectionForm.css'
import { Form } from 'semantic-ui-react'

class TriviaSelectionForm extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    numQuestions: 10,
    category: '',
    difficulty: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // getNumQuestions = { this.state.numQuestions }
    // getCategory = { this.state.category }
    // getDifficulty = { this.state.difficulty }
    console.log("State:", this.state)
    this.props.getTrivia(this.state)
    this.props.history.push('/questions')
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <h2>Make Your Selections</h2>
        <div className="row center">
          <div className="col s3"></div>
          <div className="col s6">
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label htmlFor="numQuestions">Number of Questions(10-50)</label>
                <input className="num-questions" type="number" min="10" max="50" name="numQuestions" value={this.state.numQuestions} onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label htmlFor="category">Category</label>
                <select id="categories" name="category" value={this.state.category} onChange={this.handleChange}>
                  <option value="any" default>Any Category</option>
                  <option value="9" default>General Knowledge</option>
                  <option value="10" default>Entertainment: Books</option>
                  <option value="11" default>Entertainment: Film</option>
                  <option value="12" default>Entertainment: Music</option>
                  <option value="13" default>Entertainment: Musicals/Theater</option>
                  <option value="14" default>Entertainment: Television</option>
                  <option value="15" default>Entertainment: Video Games</option>
                  <option value="16" default>Entertainment: Board Games</option>
                  <option value="17" default>Science/Nature</option>
                  <option value="18" default>Science: Computers</option>
                  <option value="19" default>Science: Mathmatics</option>
                  <option value="20" default>Mythology</option>
                  <option value="21" default>Sports</option>
                  <option value="22" default>Geography</option>
                  <option value="23" default>History</option>
                  <option value="24" default>Politics</option>
                  <option value="25" default>Art</option>
                  <option value="26" default>Celebrities</option>
                  <option value="27" default>Animals</option>
                  <option value="28" default>Vehicles</option>
                  <option value="29" default>Entertainment: Comics</option>
                  <option value="30" default>Science: Gadgets</option>
                  <option value="31" default>Entertainment: Japanese Anime/Mange</option>
                  <option value="32" default>Entertainment: Cartoons/Animation</option>
                </select>
              </Form.Field>
              <Form.Field>
                <label htmlFor="difficulty">Difficulty</label>
                <select id="difficulty" name="difficulty" value={this.state.difficulty} onChange={this.handleChange}>
                  <option value="any" default>Any</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </Form.Field>
              <button className="btn btn-default" type="submit" >Start Game!</button>
            </Form>
          </div>
          <div className="col s3"></div>
        </div>
      </div>
    )
  }
}

export default TriviaSelectionForm;