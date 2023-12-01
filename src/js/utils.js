"use strict";

// displayRandomQuestion() -----------------------------

export const shuffleAnswers = function (arr) {
  // Fisher-Yates
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (1 + i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

export const calculatePoints = function (state, operator, value) {
  if (operator === "+") {
    state.points += value;
  } else if (operator === "-" && state.points > 0) {
    state.points = Math.max(0, state.points - value);
  }
};
