"use strict";

import * as utils from "./utils.js";

const wrapper = document.querySelector("#quiz");
const pointsEl = document.querySelector("#quiz__points");
console.log(pointsEl);
const overlayPointsEl = document.querySelector("#overlay__points");
const finishTextEl = document.querySelector(".overlay__finish-text");
const questionEl = document.querySelector("#quiz h1");
const questionNumberEl = document.querySelector("#quiz h4");

export const displayFinalWords = function (state) {
  const pointsInPercent = (state.points / state.questionsLimit) * 100;
  const slogans = {
    bad: "Nicht ganz auf der Höhe, aber Übung macht den Meister! 😉",
    middle:
      "Na ja, noch nicht gerade ein Genie, aber du kommst durch den Alltag! 😄",
    good: "Solide Leistung, aber da geht noch was - genau wie im Fitnessstudio! 😊",
    super:
      "Nicht schlecht! Dein Gehirn zeigt Potenzial und das ist doch schon was! 👍",
    perfect: "Beeindruckend! Man könnte meinen du hast gemogelt! 🌟",
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

export const updateDOM = function (question, answers, btns) {
  questionEl.innerHTML = question;
  btns.forEach((btn, index) => {
    btn.innerHTML = answers[index];
  });
};

export const displayResult = function (state) {
  if (!state.checked) {
    const correctBtn = document.querySelector(
      `#quiz__answer-button-0${state.correctAnswerIndex}`
    );
    utils.calculatePoints("-", 2);
    displayPoints(state);
    correctBtn.classList.add("correct");
    state.checked = true;
  }
};

export const displayQuestionNumber = function (state) {
  questionNumberEl.innerHTML = `Frage Nr. ${state.currentQuestion} von ${state.questionsLimit}`;
};

export const displayPoints = function (state) {
  overlayPointsEl.innerHTML = pointsEl.innerHTML = `Punkte: ${state.points}`;
};

export const resetButtons = function (answerBtns) {
  answerBtns.forEach((btn) => {
    btn.classList.remove("wrong");
    btn.classList.remove("correct");
  });
};

export const hideElement = function (selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.classList.add("hidden");
  }
};

export const displayElement = function (selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.classList.remove("hidden");
  }
};

export const displayWrapper = function () {
  if (wrapper) {
    wrapper.style.display = "flex";
  }
};

export const hideWrapper = function () {
  if (wrapper) {
    wrapper.style.display = "none";
  }
};
