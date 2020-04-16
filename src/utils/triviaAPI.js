const BASE_URL = 'https://opentdb.com/api.php?amount='

export function getTrivia(formData) {
  let queryParams = `${formData.numQuestions}`
  switch (true) {
    case formData.difficulty !== "":
      queryParams += `&difficulty=${formData.difficulty}`
    case formData.category !== "":
      queryParams += `&category=${formData.category}`
      break;

  }
  console.log("queryParams: ", queryParams)
  console.log("TriviaAPI1", formData)
  return fetch(`${BASE_URL}${queryParams}`)
    .then(res => res.json());
}
