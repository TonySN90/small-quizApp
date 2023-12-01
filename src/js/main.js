"use strict";

import "./../scss/style.scss";
import { questionData } from "./data_web.js";
import * as config from "./config.js";
import * as utils from "./utils.js";
import * as view from "./view.js";
console.log(config.QUESTION_LIMIT);

// Elements
const answerBtns = document.querySelectorAll(".quiz__answer-buttons button");
const startBtn = document.querySelector(".overlay__greeting button");
const againBtn = document.querySelector(".overlay__finish button");
const displayResultBtn = document.querySelector("#quiz__result-button");
const nextBtn = document.querySelector("#quiz__next-button");

const quizApp = function () {
  const state = {
    currentQuestion: 0,
    correctAnswerIndex: 0,
    answeredQuestions: 0,
    questionsLimit: config.QUESTION_LIMIT,
    points: 0,
    checked: false,
    displayedQuestionIndices: [],
    remainingQuestions: [],
  };

  const displayRandomQuestion = function () {
    // Generate a list of the remaining questions that are not displayed
    state.remainingQuestions = questionData.filter(
      (_, index) => !state.displayedQuestionIndices.includes(index)
    );

    // If all questions have been displayed, reset the array
    if (state.remainingQuestions.length === 0) {
      state.displayedQuestionIndices.length = 0;
    }

    // Choose a random question from the remaining questions
    const randomQuestionIndex = Math.floor(
      Math.random() * state.remainingQuestions.length
    );

    const data = state.remainingQuestions[randomQuestionIndex];

    // Add the index of the current data (data) to the list of displayed question indices.
    state.displayedQuestionIndices.push(questionData.indexOf(data));

    const answers = [
      data.correctAnswer,
      data.incorrectAnswers[0],
      data.incorrectAnswers[1],
      data.incorrectAnswers[2],
    ];

    utils.shuffleAnswers(answers);
    view.updateDOM(data.question, answers, answerBtns);

    // store index of correct answer
    state.correctAnswerIndex = answers.indexOf(data.correctAnswer);

    // count current question
    state.currentQuestion += 1;
  };

  const checkSelection = function (e) {
    if (!state.checked) {
      const selectedButton = e.target;
      const targetID = +selectedButton.dataset.id;
      const correctBtn = document.querySelector(
        `#quiz__answer-button-0${state.correctAnswerIndex}`
      );

      const handleAnswer = (operator, truthValue) => {
        state.checked = true;
        utils.calculatePoints(state, operator, 1);
        view.displayPoints(state);
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

  const prepareNextQuestion = function () {
    if (state.checked) {
      state.answeredQuestions += 1;
      if (state.answeredQuestions === state.questionsLimit) {
        view.hideWrapper();
        view.displayElement(".overlay__finish");
        view.resetButtons(answerBtns);
        view.displayPoints(state);
        view.displayFinalWords(state);
      } else {
        displayRandomQuestion();
        view.resetButtons(answerBtns);
        view.displayQuestionNumber(state);
      }
    }
    state.checked = false;
  };

  const resetQuiz = function () {
    state.answeredQuestions = 0;
    state.questionsLimit = config.QUESTION_LIMIT;
    state.displayedQuestionIndices = [];
    state.remainingQuestions = [];
    state.points = 0;
    state.currentQuestion = 0;
    view.displayPoints(state);
  };

  const initialize = function () {
    displayRandomQuestion();
    view.displayQuestionNumber(state);
  };

  initialize();

  // Click functions
  startBtn.addEventListener("click", () => {
    view.hideElement(".overlay__greeting");
    view.displayWrapper();
  });

  againBtn.addEventListener("click", () => {
    resetQuiz();
    view.displayWrapper();
    view.hideElement(".overlay__finish");
    initialize();
  });

  answerBtns.forEach((btn) => btn.addEventListener("click", checkSelection));
  nextBtn.addEventListener("click", prepareNextQuestion);
  displayResultBtn.addEventListener("click", () => view.displayResult(state));
};

quizApp();
