import countries from "./countries.js";
const copyCountries = [...countries];

//DOM
const welcomePage = document.querySelector(".welcomePage");
const gamePage = document.querySelector(".gamePage");
const resultsPage = document.querySelector(".resultsPage");
const scoreCount = document.getElementById("score");
const countriesLeft = document.getElementById("countriesLeft");
const difficultyBtns = document.getElementById("difficultyBtns");
const nameButton1 = document.getElementById("nameButton1");
const nameButton2 = document.getElementById("nameButton2");
const nameButton3 = document.getElementById("nameButton3");
const nameButton4 = document.getElementById("nameButton4");
const nameBtns = document.getElementById("nameBtns");
const nameBtnsAll = document.querySelectorAll(".nameButtons");
const nextName = document.getElementById("nextName");
const countryImg = document.querySelector(".countryImg");
const result = document.getElementById("result");
const rounds = document.getElementById("rounds");
const newGame = document.getElementById("newGame");

//Global variables
let difficultyBtn;
let chosenDiff;
let gameIndex = 0;
let score = 0;
let gameRounds = 0;

//Functions
const hide = (hide) => hide.classList.add("d-none");
const show = (show) => show.classList.remove("d-none");

const correct = (correct) => correct.classList.add("btn-outline-success");
const wrong = (wrong) => wrong.classList.add("btn-outline-danger");

const removeCorrect = (correct) =>
  correct.classList.remove("btn-outline-success");
const removeWrong = (wrong) => wrong.classList.remove("btn-outline-danger");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//Function for slicing countries array depending on choosen difficulty
let sliceArray = (difficulty) => {
  shuffleArray(copyCountries);
  if (difficulty.value == 5) {
    return copyCountries.slice(0, 5);
  } else if (difficulty.value == 10) {
    return copyCountries.slice(0, 10);
  } else if (difficulty.value == 20) {
    return copyCountries.slice(0, 20);
  } else return copyCountries;
};

//Start Game function
const startGame = (start) => {
  chosenDiff = sliceArray(start);

  hide(welcomePage);
  show(gamePage);

  countriesLeft.innerText = `Countries left ${gameIndex}`;

  nextCountry();
};

//Next countryfunction
const nextCountry = () => {
  if (gameIndex < chosenDiff.length) {
    const correctCountry = chosenDiff[gameIndex];
    countryImg.src = correctCountry.image;
    //I am aware that it probably would have been more correct to use correctCountry.id here, but I couldn't find a good solution to the problem.
    countryImg.id = correctCountry.name;

    //Filters out the right name
    const namebuttonsFilter = copyCountries.filter(
      (country) => country !== correctCountry
    );

    shuffleArray(namebuttonsFilter);

    const threeOptions = namebuttonsFilter
      .map((country) => country.name)
      .slice(0, 3);

    const nameButtonArray = [correctCountry.name, ...threeOptions];

    shuffleArray(nameButtonArray);

    nameButton1.innerText = nameButtonArray[0];
    nameButton2.innerText = nameButtonArray[1];
    nameButton3.innerText = nameButtonArray[2];
    nameButton4.innerText = nameButtonArray[3];

    gameIndex++;
  } else {
    hide(gamePage);
    show(resultsPage);
    gameRounds++;
    rounds.innerHTML += `<li>Spelrunda: ${gameRounds}, antal länder: ${chosenDiff.length}, poäng: ${score}</li>`;
  }
};

//Event listners
difficultyBtns.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target !== e.currentTarget) {
    difficultyBtn = e.target;
    startGame(difficultyBtn);
  }
});

nameBtns.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target !== e.currentTarget) {
    const clickedBtnName = e.target;

    if (clickedBtnName.innerText === countryImg.id) {
      correct(clickedBtnName);
      show(nextName);
      score++;
      scoreCount.innerText = `Score:${score} `;
      result.innerHTML = `Du fick ${score} poäng!`;
    } else {
      wrong(clickedBtnName);
      show(nextName);
    }
    nameBtnsAll.forEach((nameBtn) => {
      nameBtn.disabled = true;
    });
  }
});

nextName.addEventListener("click", (e) => {
  e.preventDefault();

  countriesLeft.innerText = `Countries left ${chosenDiff.length - gameIndex}`;

  nameBtnsAll.forEach((nameBtn) => {
    removeWrong(nameBtn);
    removeCorrect(nameBtn);
    nameBtn.disabled = false;
  });
  nextCountry();
  hide(nextName);
});

newGame.addEventListener("click", (e) => {
  e.preventDefault();
  hide(resultsPage);
  show(welcomePage);
  score = 0;
  gameIndex = 0;
  scoreCount.innerText = `Score:${score} `;
  result.innerHTML = `Du fick ${score} poäng!`;
  countriesLeft.innerText = `Countries left ${gameIndex}`;
});

//Here was the beginning of a plan to make a list of each result from each answer, but i dident have time to finish it
// let resultsArr = [];

// let resultPage = chosenDiff.map((answer) => {
//   resultsArr.push(answer)
//   if (answer.includes(correct)) {
//     return answer + value = true;
//   } else {
//     return answer + value = false;
//   }
// })
// console.log(resultsArr)
