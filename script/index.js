
//text to spech
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-EN'; // English
  window.speechSynthesis.speak(utterance);
}

//find synonyms function
const createElement = (arr) => {
  const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElement.join(' ');
};

//spiner function
const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden');
  } else {
    document.getElementById('spinner').classList.add('hidden');
    document.getElementById('word-container').classList.remove('hidden');
  }
};

//load lesson btn function
const loadLesson = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((json) => {
      displayLesson(json.data);
    });
};

//remove active btn
const removeActive = () => {
  const lessonButtons = document.querySelectorAll('.lesson-btn');
  lessonButtons.forEach((btn) => btn.classList.remove('active'));
};

// ~~~~~~~~~load lavel word function~~~~~~~~~~~~~~
const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //remove active action
      removeActive();
      //active btn set
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add('active');
      displayLevelWord(data.data);
    });
};

//word details function
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
  const detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML = `
  <div class="">
            <h2 class="text-xl md:text-2xl font-bold ">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
            </h2>

          </div>
          <div class="">
            <h2 class="text-sm md:text-base font-semibold">Meaning</h2>
            <p class="font-bangla">${word.meaning}</p>
          </div>

          <div class="">
            <h2 class="text-sm md:text-base font-semibold">Example</h2>
            <p class="">${word.sentence}</p>
          </div>

          <div class="">
            <h2 class="text-base md:text-lg font-bangla font-bold">সমার্থক শব্দ গুলো</h2>
            <div>
            
            </div>
            ${createElement(word.synonyms)}
          </div>
  `;
  document.getElementById('word_modal').showModal();
};

//display lavel word
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="text-center   col-span-full space-y-2">
    <img src="./assets/alert-error.png" alt="alert_img" class="mx-auto">
        <p class="text-[#79716B] font-light font-bangla text-sm sm:text-base md:text-lg lg:text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class=" font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">নেক্সট Lesson এ যান।</h2>
      </div>
    `;
    manageSpinner(false);
    return;
  }
  //get evevry word
  words.forEach((word) => {
    const card = document.createElement('div');

    card.innerHTML = `<div class="bg-white rounded-xl shadow-sm text-center px-2 md:px-5  py-2 sm:py-4  md:py-8 
     space-y-2 md:space-y-3">
        <h2 class="font-bold text-xl md:text-2xl">${word.word}</h2>
        <p class="font-semibold text-base">Meaning /Pronunciation</p>
        <div class="font-bangla text-lg
         md:text-xl font-medium ">${word.meaning ? word.meaning : 'অর্থ পাওয়া যায় নি'} / ${word.pronunciation}</div>
        <div class="flex justify-between items-center">

          <button onclick="loadWordDetails(${word.id})" class="btn bg-[#ECF6FE] hover:bg-[#aad3f5] duration-300 text-lg py-0 px-3"><i class="fa-solid fa-circle-info"></i></button>

          
          <button onclick="pronounceWord('${word.word}')" class="btn bg-[#ECF6FE]  hover:bg-[#aad3f5] duration-300 text-lg py-0 px-3"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

const displayLesson = (lessons) => {
  //1) get the container & empty
  const lavelContainer = document.getElementById('lavel-container');
  lavelContainer.innerHTML = '';

  //get into every lesson
  for (let lesson of lessons) {
    //create element
    const btnDiv = document.createElement('div');
    //lesson btn
    btnDiv.innerHTML = `
          <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${
            lesson.level_no
          })"   class="lesson-btn btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i></i>Lesson ${
            lesson.level_no
          }</button>
    `;
    lavelContainer.appendChild(btnDiv);
  }
};

loadLesson();

document.getElementById('btn-search').addEventListener('click', () => {
  removeActive();
  const input = document.getElementById('input-search');
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);
  fetch('https://openapi.programming-hero.com/api/words/all')
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
  

      const filterWord = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
      displayLevelWord(filterWord);
      
    });
});
