// Load all the controllers within this directory and all subdirectories.
// Controller files must be named *_controller.js.

import { preventOverflow } from "@popperjs/core"
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

const application = Application.start()
const context = require.context("controllers", true, /_controller\.js$/)
application.load(definitionsFromContext(context))

// const next = document.getElementById('next');
// const form_category = document.querySelectorAll(".form-category")

// next.addEventListener("click", (event) => {
//   // je prévent le default du click du next step
//   event.preventDefault();

//   // je selection la partie du questionnaire que l'on veut active
//   const active_form = document.querySelector(".form-category")

//   // je lui retire pour le rendre d-none
//   active_form.classList.remove("active")

//   // j'ajoute le .active a son sibling pour retirer le d-none
//   const next_category = active_form.nextElementSibling;
//   next_category.classList.add("active")

//   // on fait disparaitre la carde de présentation
//   intro_card.classList.add("d-none")
// })


// div de la card d'introduction et son boutton
const introCard = document.querySelector(".website-presentation")
const findDistrictButton = document.getElementById("find_district");

// button suivant/précédant
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

// cercle de la progress bar
const circles = document.querySelectorAll('.form-circle-bar');
const progress = document.getElementById('progress');
const progressBar = document.getElementById("progress-bar")

// div de la card du questionnaire
const cardPage = document.querySelector(".card-page")

// div d'une partie du questionnaire
let activeForm = document.querySelector(".form-category");

findDistrictButton.addEventListener("click", (event) => {
  event.preventDefault();
  // je fais disparaitre le boutton "trouve ton quartier" et la card
  findDistrictButton.classList.add("disable");
  introCard.classList.add("disable");

  // activeForm.classList.remove("active");
  cardPage.classList.remove("d-none")
  activeForm.classList.add("active");
  nextButton.classList.add("active");
})

// const activeForm = document.querySelector(".form-category")

// permet de calculer l'avancement des cercles
let currentActive = 1;

// permet de calculer l'avancement de la bar de progression
let progressionBar = 0;

nextButton.addEventListener("click", (event) => {
  event.preventDefault;
  currentActive++;

  if(currentActive > circles.length) {
    currentActive = circles.length;
  }
  update()

  activeForm.classList.remove("active");

  const nextCategory = activeForm.nextElementSibling;
  nextCategory.classList.add("active");
  activeForm = document.querySelector(".form-category.active");

  // let activeForm = document.querySelector(".form-category.active");
  previousButton.classList.add("active");

  const submitFormButton = document.querySelector(".form-category.submit-button");

  progressBar.value += 33;
  progressBar.value === 99 ? nextButton.classList.remove("active") : "";
  progressBar.value === 99 ? submitFormButton.classList.add("active") : "";
  // previousButton.classList.value == "form-button active" ? null : previousButton.classList.add("active");
})



previousButton.addEventListener("click", (event) => {
  event.preventDefault;

  currentActive--;
  if(currentActive < 1) {
      currentActive = 1;
  }
  update()

  activeForm.classList.remove("active");

  const previousCategory = activeForm.previousElementSibling;
  // console.log(previousCategory.classList)
  previousCategory.classList.add("active");
  activeForm = document.querySelector(".form-category.active");

  progressBar.value -= 33;
  progressBar.value != 100 ? nextButton.classList.add("active") : "";
  // if (progressBar.value === 100 && nextButton.classList != "active") {
  //   nextButton.classList.add("active");
  // }

})



function update() {
  circles.forEach(function(circle, idx) {
      if(idx < currentActive) {
          circle.classList.add('active');
      } else {
          circle.classList.remove('active');
      }
  })

  const actives = document.querySelectorAll('.active');

  progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%';

  // if(currentActive === 1) {
  //   previousButton.disabled = true;
  // } else if (currentActive === circles.length) {
  //   nextButton.disabled = true;
  // } else {
  //   previousButton.disabled = false;
  //   nextButton.disabled = false;
  // }
}


// js card form

// document.addEventListener("click", (event) => {
//   // console.log("event", event);
//   const choose = event.target;
//   console.log("choose", choose);
//   const selects = document.querySelectorAll(".type");
//   selects.forEach((select) => {
//     if ((choose === select) || (choose === select.children )) {
//       select.classList.toggle('active');
//       console.log("select", select)
//       console.log(select.children)
//     }
//   });
// });

// const checkbox = document.querySelectorAll(".checkbox");

const selects = document.querySelectorAll(".type");
  selects.forEach((select) => {
    select.addEventListener("click", (event) => {
      select.classList.toggle('active');
      const checkbox = select.querySelector(".checkbox");
      if (checkbox.checked == true) {
        checkbox.checked = false
      } else {
        checkbox.checked = true
      }
      console.log("checkbox 2", checkbox.checked)
      console.log("select", select)
    })

  });









// const cards = document.querySelectorAll(".type");

// const toggleActiveClass = (toggle) => {
//   toggle.currentTarget.classList.toggle("active");
// };

// const bindToClick = (form) => {
//   form.addEventListener("click", toggleActiveClass);
// };

// cards.forEach(bindToClick);
