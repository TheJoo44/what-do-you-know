import React, { useEffect } from "react";
import { Link } from 'react-router-dom';


function Score({ score, questions, userAnswers }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const correct = questions.map((question, questionIdx) => {
    const userAnswersKey = `checked-${questionIdx}`

    return (
      <div key={questionIdx}>
        <h3 className="score-question" dangerouslySetInnerHTML={{ __html: `Question: ${question.question}` }}></h3>
        <h4 className="score-answer" dangerouslySetInnerHTML={{ __html: `Correct Answer: ${question.correct_answer}` }}></h4>
        <h4 className="score-useranswer" dangerouslySetInnerHTML={{ __html: `Your Answer: ${userAnswers[userAnswersKey]}` }}></h4>
        <hr className="line"></hr>
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
      <Link to="/trivia"><button className="btn btn-default waves-effect waves-light blue accent-2 ques-submit-btn">Play Again?</button></Link>
    </div >
  )
}


export default Score;