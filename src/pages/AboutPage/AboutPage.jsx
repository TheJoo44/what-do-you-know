import React from 'react';
import './AboutPage.css'

const AboutPage = (props) => {
  return (
    <div className="container about-page">
      <h1>About The App</h1>
      <p className="content">I love trivia and I hope you do too.  I built this game with the Open Trivia API, a user-contributed trivia question database with over 3700 verified questions and just as many pending confirmation.  If you would like to contribute a question to the database, check out <a href="https://opentdb.com/" target="_blank">OpenTDB</a> to submit your question for review.  Once you sign up, the app will keep track of the total games you've played, and your total correct and incorrect answers.  Choose up to 50 questions from a multitude of categories and varying levels of difficulty.  I hope you have as much fun playing it as I had building it.  Have fun and good luck!</p>
    </div>
  )
}

export default AboutPage;