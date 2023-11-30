"use strict";

import "./../scss/style.scss";
import { questionData } from "./data.js";

// Elements
const wrapper = document.querySelector("#quiz");
const questionEl = document.querySelector("#quiz__question");
const questionNumberEl = document.querySelector("#quiz__question-number");
const answerBtns = document.querySelectorAll(".quiz__answer-buttons > button");

const startBtn = document.querySelector("#startButton");
const againBtn = document.querySelector(".overlay__finish > button");
const displayResultBtn = document.querySelector("#quiz__result-button");
const nextBtn = document.querySelector("#next");
const pointsEl = document.querySelector("#quiz__points");
const overlayPointsEl = document.querySelector("#overlay__points");
const finishTextEl = document.querySelector(".overlay__finish-text");

// config
const QUESTION_LIMIT = 4;

const quizApp = function () {
  const state = {
    currentQuestion: 0,
    correctAnswerIndex: 0,
    answeredQuestions: 0,
    questionsLimit: QUESTION_LIMIT,
    points: 0,
    checked: false,
    displayedQuestionIndices: [],
    remainingQuestions: [],
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
    answerBtns.forEach((btn, index) => {
      btn.innerHTML = answers[index];
    });
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

    shuffleAnswers(answers);
    updateDOM(data.question, answers);

    // store index of correct answer
    state.correctAnswerIndex = answers.indexOf(data.correctAnswer);

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
        calculatePoints(operator, 1);
        displayPoints(pointsEl);
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
    answerBtns.forEach((btn) => {
      btn.classList.remove("wrong");
      btn.classList.remove("correct");
    });
  };

  const displayFinalWords = function () {
    const pointsInPercent = (state.points / state.questionsLimit) * 100;
    const slogans = {
      bad: "Schlecht, schlechter..Du ! xD Geh in die Ecke und schäm dich oder versuchs nochmal..! 🤨",
      middle:
        "Naja, ne geistige Leuchte biste noch nicht aber zum Überleben reichts..! 🤨",
      good: "Nicht schlecht, gibt aber noch Luft nach oben, wie deine Qualität im Bett..! 🤨",
      super:
        "Du Glücklicher, dein Gehirn hat also doch noch Sinn in deinem Leben..! 🤨",
      perfect: "Mhh..Das geht doch nicht mit rechten Dingen zu..! 🤨",
    };

    switch (true) {
      case pointsInPercent === 100:
        finishTextEl.innerHTML = slogans.perfect;
        break;
      case pointsInPercent >= 85:
        finishTextEl.innerHTML = slogans.super;
        break;
      case pointsInPercent >= 65:
        finishTextEl.innerHTML = slogans.good;
        break;
      case pointsInPercent >= 50:
        finishTextEl.innerHTML = slogans.middle;
        break;
      default:
        finishTextEl.innerHTML = slogans.bad;
    }
  };

  const prepareNextQuestion = function () {
    if (state.checked) {
      state.answeredQuestions += 1;
      if (state.answeredQuestions === state.questionsLimit) {
        hideWrapper();
        displayElement(".overlay__finish");
        resetButtons();
        displayPoints(overlayPointsEl);
        displayFinalWords();
      } else {
        displayRandomQuestion();
        resetButtons();
        console.log(state.currentQuestion);
        displayQuestionNumber();
      }
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

  const displayPoints = function (el) {
    el.innerHTML = `Punkte: ${state.points}`;
  };

  const displayQuestionNumber = function () {
    questionNumberEl.innerHTML = `Frage Nr. ${state.currentQuestion} von ${state.questionsLimit}`;
  };

  const displayResult = function () {
    if (!state.checked) {
      const correctBtn = document.querySelector(
        `#quiz__answer-button-0${state.correctAnswerIndex}`
      );
      calculatePoints("-", 2);
      displayPoints(pointsEl);
      correctBtn.classList.add("correct");
      state.checked = true;
    }
  };

  const resetQuiz = function () {
    state.answeredQuestions = 0;
    state.questionsLimit = QUESTION_LIMIT;
    state.displayedQuestionIndices = [];
    state.remainingQuestions = [];
    state.points = 0;
    state.currentQuestion = 0;
    displayPoints(pointsEl);
  };

  const hideElement = function (selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.add("hidden");
    }
  };

  const displayElement = function (selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.remove("hidden");
    }
  };

  const displayWrapper = function () {
    if (wrapper) {
      wrapper.style.display = "flex";
    }
  };

  const hideWrapper = function () {
    if (wrapper) {
      wrapper.style.display = "none";
    }
  };

  const initialize = function () {
    console.log(state.currentQuestion);
    displayRandomQuestion();
    displayQuestionNumber();
  };

  initialize();

  // Click functions
  startBtn.addEventListener("click", () => {
    hideElement(".overlay__greeting");
    displayWrapper();
  });

  againBtn.addEventListener("click", () => {
    resetQuiz();
    displayWrapper();
    hideElement(".overlay__finish");
    initialize();
  });

  answerBtns.forEach((btn) => btn.addEventListener("click", checkSelection));
  nextBtn.addEventListener("click", prepareNextQuestion);
  displayResultBtn.addEventListener("click", displayResult);
};

quizApp();
