import React from 'react';
import './HomePage.css'
import logo from "./logo.png"

const HomePage = (props) => {
  return (
    <div className="HomePage">
      <h1 className="home-title">Welcome to What Do YOU Know?</h1>
      <img src={logo} alt="logo" className="home-logo"></img>
      <p className="home-text1">Test you knowledge with up to 50 random trivia questions from a variety of categories.</p>
      <p className="home-text2">Select the number of questions, categories, and difficulty for a customized trivia experience.  </p>
    </div >
  )
}

export default HomePage;