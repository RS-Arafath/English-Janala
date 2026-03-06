const loadLesson = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((json) => {
      displayLesson(json.data)
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
          <button  class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i></i>Lesson ${
            lesson.level_no
          }</button>
    `;
    lavelContainer.appendChild(btnDiv)
    
  }
  
}
loadLesson();
