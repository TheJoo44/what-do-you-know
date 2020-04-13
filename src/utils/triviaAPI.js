const BASE_URL = 'https://opentdb.com/api.php?amount=10'

export function getTrivia(formData) {
  return fetch(`${BASE_URL}`)
    .then(res => res.json());
}
