import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Score.css"


function Score({ score, questions, userAnswers }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const correct = questions.map((question, questionIdx) => {
    const userAnswersKey = `checked-${questionIdx}`

    function FinalAnswers(props) {
      return (
        question.correct_answer === userAnswers[userAnswersKey] ?
          <div>
            <h4 className="answer-prompt">Correct Answer: &nbsp;&nbsp;&nbsp;
              <span className="score-correct" dangerouslySetInnerHTML={{ __html: `${question.correct_answer}` }}></span>
            </h4>
            <h4 className="answer-prompt">Your Answer: &nbsp;&nbsp;&nbsp;
              <span className="score-correct" dangerouslySetInnerHTML={{ __html: `${userAnswers[userAnswersKey]}` }}></span>
            </h4>
          </div>
          :
          <div>
            <h4 className="answer-prompt">Correct Answer: &nbsp;&nbsp;&nbsp;
              <span className="score-incorrect" dangerouslySetInnerHTML={{ __html: `${question.correct_answer}` }}></span>
            </h4>
            <h4 className="answer-prompt">Your Answer: &nbsp;&nbsp;&nbsp;
              <span className="score-incorrect" dangerouslySetInnerHTML={{ __html: `${userAnswers[userAnswersKey]}` }}></span>
            </h4>
          </div>
      )
    }

    return (
      <div key={questionIdx}>
        <h3 className="score-question" dangerouslySetInnerHTML={{ __html: `Question: ${question.question}` }}></h3>
        <FinalAnswers />
        <hr className="line"></hr>
        <br />
        <br />
      </div >
    )
  })
  return (
    <div className="container scorebox" >
      <div className="row">
        <h1 className="score-title ">Thanks For Playing!</h1>
        <h2>You got <span className="score-correct-total" style={score > 5 ? { color: 'green' } : { color: 'red' }}>{score}</span> correct!</h2>
        <h3 className="score-answers">{correct}</h3>
        <Link to="/trivia"><button className="btn btn-default waves-effect waves-light blue accent-2 ques-submit-btn">Play Again?</button></Link>
      </div>
    </div >
  )
}


export default Score;