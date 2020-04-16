import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

class TriviaSelectionForm extends Component {
  state = {
    numQuestions: null,
    category: null,
    difficulty: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // this.props.getNumQuestions(this.state.numQuestions);
    // this.props.getCategory(this.state.category);
    // this.props.getDifficulty(this.state.difficulty);
    this.props.getTrivia(this.state)
  }

  render() {
    return (
      <div>
        <h2>Make Your Selections</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label for="numQuestions">Number of Questions(10-50)</label>
            <input type="number" min="10" max="50" name="numQuestions" onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label for="category">Category</label>
            <select id="categories" name="category" onChange={this.handleChange}>
              <option value="any" default>Any Category</option>
            </select>
          </Form.Field>
          <Form.Field>
            <label for="difficulty">Difficulty</label>
            <select id="difficulty" name="difficulty" onChange={this.handleChange}>
              <option value="any" defualt>Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}

export default TriviaSelectionForm;