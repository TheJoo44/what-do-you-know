import React from "react";
import { Link } from 'react-router-dom';


function Score({ score, questions, userAnswers }) {
  const correct = questions.map((question, questionIdx) => {
    const userAnswersKey = `checked-${questionIdx}`

    return (
      <div key={questionIdx}>
        <h3 dangerouslySetInnerHTML={{ __html: `Question: ${question.question}` }}></h3>
        <h3 dangerouslySetInnerHTML={{ __html: `Correct Answers: ${question.correct_answer}` }}></h3>
        <h3 dangerouslySetInnerHTML={{ __html: `Your Answers: ${userAnswers[userAnswersKey]}` }}></h3>
        <br />
        <br />
      </div >
    )
  })
  return (
    < div >
      <h1>Thanks For Playing!</h1>
      <h2>You got {score} correct!</h2>
      <h3>{correct}</h3>
      <Link to="/trivia"><button className="btn btn-default">Play Again?</button></Link>
    </div >
  )
}


export default Score;