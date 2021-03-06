const shuffle = (arr) => {
  arr.sort(() => Math.random() - 0.5)
  return arr;
}

export function shuffleAnswers(shuffled) {
  shuffled.results.forEach(result => {
    let answers = [...result.incorrect_answers, result.correct_answer]
    result.answers = answers.length > 3 ? shuffle(answers) : ["True", "False"]
  })
  return shuffled;
}

export function correctAnswers(questionsArr) {
  return questionsArr.results.reduce((obj, question, idx) => {
    return {
      ...obj, [`checked-${idx}`]: question.correct_answer
    }
  }, {})
}

