"use strict";

import "./../scss/style.scss";
import { questionData } from "./data.js";

const quizApp = function () {
  const questionEl = document.querySelector("#question");

  const answerButtons = document.querySelectorAll(".button");
  const answerBtn_01 = document.querySelector("#answerButton_00");
  const answerBtn_02 = document.querySelector("#answerButton_01");
  const answerBtn_03 = document.querySelector("#answerButton_02");
  const answerBtn_04 = document.querySelector("#answerButton_03");

  const displaySolutionBtn = document.querySelector("#result");
  const nextBtn = document.querySelector("#next");
  const pointsEl = document.querySelector("#points");

  const state = {
    correctAnswerIndex: 0,
    currentQuestion: 0,
    totalQuestions: 25,
    points: 0,
    checked: true,
  };

  const displayAnswers = function () {
    let data = questionData[state.currentQuestion];
    let answers = [
      data.correctAnswer,
      data.incorrectAnswers[0],
      data.incorrectAnswers[1],
      data.incorrectAnswers[2],
    ];

    const shuffle = (arr) => {
      // Fisher-Yates
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (1 + i));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };

    shuffle(answers);

    questionEl.innerHTML = data.question;
    answerBtn_01.innerHTML = answers[0];
    answerBtn_02.innerHTML = answers[1];
    answerBtn_03.innerHTML = answers[2];
    answerBtn_04.innerHTML = answers[3];

    // store index of correct answer
    state.correctAnswerIndex = answers.indexOf(data.correctAnswer);
  };

  const checkSelection = function (e) {
    if (state.checked) {
      const selectedButton = e.target;
      const targetID = +selectedButton.dataset.id;
      const correctBtn = document.querySelector(
        `#answerButton_0${state.correctAnswerIndex}`
      );

      if (targetID === state.correctAnswerIndex) {
        // if correct
        state.checked = false;
        state.points += 1;
        displayPoints();
        selectedButton.classList.add("correct");
      } else {
        // if incorrect
        state.checked = false;
        calculatePoints("-", 1);
        displayPoints();
        correctBtn.classList.add("correct");
        selectedButton.classList.add("wrong");
      }
    }
  };

  const resetButtons = function () {
    answerButtons.forEach((btn) => {
      btn.classList.remove("wrong");
      btn.classList.remove("correct");
    });
  };

  const prepareNextQuestion = function () {
    state.checked = true;
    state.currentQuestion += 1;
    displayAnswers();
    resetButtons();
  };

  const calculatePoints = function (operator, value) {
    if (operator === "+") {
      state.points += value;
    } else if (operator === "-" && state.points > 0) {
      state.points = Math.max(0, state.points - value);
    }
  };

  const displayPoints = function () {
    pointsEl.innerHTML = `Punkte: ${state.points}`;
  };

  const displaySolution = function () {
    calculatePoints("-", 2);
    displayPoints();
    const correctBtn = document.querySelector(
      `#answerButton_0${state.correctAnswerIndex}`
    );

    correctBtn.classList.add("correct");
    state.checked = false;
  };

  const initialize = function () {
    displayAnswers();
  };

  initialize();

  // Click function
  answerBtn_01.addEventListener("click", checkSelection);
  answerBtn_02.addEventListener("click", checkSelection);
  answerBtn_03.addEventListener("click", checkSelection);
  answerBtn_04.addEventListener("click", checkSelection);

  nextBtn.addEventListener("click", prepareNextQuestion);
  displaySolutionBtn.addEventListener("click", displaySolution);
};

quizApp();
