import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";
const playersEl = document.querySelectorAll(".player");
const computerEl = document.querySelectorAll(".computer");
const allIconsEl = document.querySelectorAll(".fa-regular");

const playerScoreEl = document.getElementById("player-score");
const playerChoiceEl = document.getElementById("player-choice");
const computerScoreEl = document.getElementById("computer-score");
const computerChoiceEl = document.getElementById("computer-choice");

const resultTextEl = document.getElementById("result-text");
const resetBtnEl = document.querySelector(".reset-icon");

const choices = {
  Rock: { name: "Rock", defeats: ["Scissors", "Lizard"] },
  Paper: { name: "Paper", defeats: ["Rock", "Spock"] },
  Scissors: { name: "Scissors", defeats: ["Paper", "Lizard"] },
  Lizard: { name: "Lizard", defeats: ["Paper", "Spock"] },
  Spock: { name: "Spock", defeats: ["Scissors", "Rock"] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice;
playerScoreEl.textContent = playerScoreNumber;
computerScoreEl.textContent = computerScoreNumber;
//Removing Selected class from all Icons before adding it to one
const resetSelected = () => {
  allIconsEl.forEach((icon) => {
    icon.classList.remove("selected");
  });
  stopConfetti();
  removeConfetti();
};

const updateScore = (playerChoice) => {
  if (playerChoice === computerChoice) {
    resultTextEl.textContent = "It's a tie 😐";
  } else {
    const currentChoice = choices[playerChoice];
    if (currentChoice.defeats.includes(computerChoice)) {
      startConfetti();
      resultTextEl.textContent = "You Won 🥳";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultTextEl.textContent = "You Lost ☹️";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
};

const computerChoiceSelector = () => {
  const choices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
  const randomNum = Math.floor(Math.random() * 5);
  computerChoice = choices[randomNum];
  computerChoiceEl.textContent = ` --- ${computerChoice}`;
  computerEl.forEach((computer) => {
    if (computerChoice === computer.title) {
      computer.classList.add("selected");
    }
  });
};

playersEl.forEach((player) => {
  player.addEventListener("click", (e) => {
    resetSelected();
    computerChoiceSelector();
    updateScore(e.target.title);
    switch (e.target.title) {
      case "Rock":
        player.classList.add("selected");
        playerChoiceEl.textContent = " --- Rock";
        break;
      case "Paper":
        player.classList.add("selected");
        playerChoiceEl.textContent = " --- Paper";
        break;
      case "Scissors":
        player.classList.add("selected");
        playerChoiceEl.textContent = " --- Scissors";
        break;
      case "Lizard":
        player.classList.add("selected");
        playerChoiceEl.textContent = " --- Lizard";
        break;
      case "Spock":
        player.classList.add("selected");
        playerChoiceEl.textContent = " --- Spock";
        break;

      default:
        break;
    }
  });
});

resetBtnEl.addEventListener("click", () => {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  resultTextEl.textContent = "";
  computerChoice;
  computerChoiceEl.textContent = ` --- Choice`;
  playerChoiceEl.textContent = " --- Choice";
  resetSelected();
});
