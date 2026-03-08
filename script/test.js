const aynonyms = ['hello', 'hi'];
const createElement = (arr) => {
  const htmlElement=arr.map(el=>`<span class="btn">${el}</span>`)
  console.log(htmlElement.join(' '));
}
createElement(aynonyms)