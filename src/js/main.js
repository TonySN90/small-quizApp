"use strict";

import "./../scss/style.scss";
import { questionData } from "./data.js";

// Elements
const questionEl = document.querySelector("#question");
const answerButtons = document.querySelectorAll(".button");
const answerBtn_01 = document.querySelector("#answerButton_00");
const answerBtn_02 = document.querySelector("#answerButton_01");
const answerBtn_03 = document.querySelector("#answerButton_02");
const answerBtn_04 = document.querySelector("#answerButton_03");
const displaySolutionBtn = document.querySelector("#result");
const nextBtn = document.querySelector("#next");
const pointsEl = document.querySelector("#points");

const quizApp = function () {
  const state = {
    correctAnswerIndex: 0,
    currentQuestion: 0,
    points: 0,
    checked: false,
    displayedQuestionIndices: [],
  };

  const shuffleAnswers = function (arr) {
    // Fisher-Yates
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (1 + i));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  const updateDOM = function (question, answers) {
    questionEl.innerHTML = question;
    answerBtn_01.innerHTML = answers[0];
    answerBtn_02.innerHTML = answers[1];
    answerBtn_03.innerHTML = answers[2];
    answerBtn_04.innerHTML = answers[3];
  };

  const displayQuestion = function () {
    const remainingQuestions = questionData.filter(
      (_, index) => !state.displayedQuestionIndices.includes(index)
    );

    if (remainingQuestions.length === 0) {
      state.displayedQuestionIndices.length = 0;
    }

    const randomQuestionIndex = Math.floor(
      Math.random() * remainingQuestions.length
    );

    const data = remainingQuestions[randomQuestionIndex];
    state.displayedQuestionIndices.push(questionData.indexOf(data));

    const answers = [
      data.correctAnswer,
      data.incorrectAnswers[0],
      data.incorrectAnswers[1],
      data.incorrectAnswers[2],
    ];

    shuffleAnswers(answers);
    updateDOM(data.question, answers);

    // store index of correct answer
    state.correctAnswerIndex = answers.indexOf(data.correctAnswer);
  };

  const checkSelection = function (e) {
    if (!state.checked) {
      const selectedButton = e.target;
      const targetID = +selectedButton.dataset.id;
      const correctBtn = document.querySelector(
        `#answerButton_0${state.correctAnswerIndex}`
      );

      const handleAnswer = (operator, truthValue) => {
        state.checked = true;
        calculatePoints(operator, 1);
        displayPoints();
        selectedButton.classList.add(truthValue);
      };

      if (targetID === state.correctAnswerIndex) {
        // if correct
        handleAnswer("+", "correct");
      } else {
        // if incorrect
        handleAnswer("-", "wrong");
        correctBtn.classList.add("correct");
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
    if (state.checked) {
      state.currentQuestion += 1;
      displayQuestion();
      resetButtons();
    }
    state.checked = false;
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
    if (!state.checked) {
      const correctBtn = document.querySelector(
        `#answerButton_0${state.correctAnswerIndex}`
      );
      calculatePoints("-", 2);
      displayPoints();
      correctBtn.classList.add("correct");
      state.checked = true;
    }
  };

  const initialize = function () {
    displayQuestion();
  };

  initialize();

  // Click functions
  answerBtn_01.addEventListener("click", checkSelection);
  answerBtn_02.addEventListener("click", checkSelection);
  answerBtn_03.addEventListener("click", checkSelection);
  answerBtn_04.addEventListener("click", checkSelection);
  nextBtn.addEventListener("click", prepareNextQuestion);
  displaySolutionBtn.addEventListener("click", displaySolution);
};

quizApp();
