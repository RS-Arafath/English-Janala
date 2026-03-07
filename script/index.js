const loadLesson = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((json) => {
      displayLesson(json.data);
    });
};
// ~~~~~~~~~load lavel word function~~~~~~~~~~~~~~

const loadLevelWord = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

//display lavel word
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';
  //get evevry word
  words.forEach((word) => {
    console.log(word);
    const card = document.createElement('div');

    card.innerHTML = `<div class="bg-white rounded-xl shadow-sm text-center  py-5 md:py-8 px-3 md:px-5 space-y-2 md:space-y-3">
        <h2 class="font-bold text-lg">${word.word}</h2>
        <p class="font-semibold">Meaning /Pronunciation</p>
        <div class="font-bangla text-xl font-medium ">${word.meaning} / ${word.pronunciation}</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#ECF6FE] hover:bg-[#aad3f5] duration-300 text-lg py-0 px-3"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#ECF6FE]  hover:bg-[#aad3f5] duration-300 text-lg py-0 px-3"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    wordContainer.append(card)
  });
};

const displayLesson = (lessons) => {
  //1) get the container & empty
  const lavelContainer = document.getElementById('lavel-container');
  lavelContainer.innerHTML = '';

  //get into every lesson
  for (let lesson of lessons) {
    //create element
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
          <button onclick="loadLevelWord(${
            lesson.level_no
          })"   class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i></i>Lesson ${
            lesson.level_no
          }</button>
    `;
    lavelContainer.appendChild(btnDiv);
  }
};
loadLesson();
