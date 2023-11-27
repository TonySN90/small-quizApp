"use strict";

import "./../scss/style.scss";
// import "data.js";

const questionData = [
  {
    category: "Allgemeine Wissenschaft",
    id: "7392058164",
    correctAnswer: "Sauerstoff",
    incorrectAnswers: ["Eisen", "Gold", "Stickstoff"],
    question: 'Welches Element hat die chemische Abkürzung "O"?',
  },

  {
    category: "Geographie",
    id: "4827365910",
    correctAnswer: "Canbarra",
    incorrectAnswers: ["Sydney", "Melbourne", "Brisbane"],
    question: "Was ist die Hauptstadt von Australien?",
  },

  {
    category: "Film und Fernsehen",
    id: "9051732846",
    correctAnswer: "Emma Stone",
    incorrectAnswers: ["Emma Watson", "Natalie Portman", "Meryl Streep"],
    question:
      'Wer hat den Oscar für die beste weibliche Hauptrolle im Film "La La Land" gewonnen?',
  },
  {
    category: "Geschichte",
    id: "6278943105",
    correctAnswer: "1918",
    incorrectAnswers: ["1916", "1920", "1939"],
    question: "In welchem Jahr endete der erste Weltkrieg?",
  },

  {
    category: "Musik",
    id: "1492086375",
    correctAnswer: "Flöte",
    incorrectAnswers: ["Geige", "Klavier", "Trompete"],
    question:
      'Welches Instrument spielt der Protagonist in Mozart\'s "Die Zauberflöte"?',
  },
];

console.log(questionData);

const quizApp = function () {
  const questionEl = document.querySelector("#question");

  const answerBtn_01 = document.querySelector("#answerButton_01");
  const answerBtn_02 = document.querySelector("#answerButton_02");
  const answerBtn_03 = document.querySelector("#answerButton_03");
  const answerBtn_04 = document.querySelector("#answerButton_04");

  const displaySolutionBtn = document.querySelector("#result");
  const nextBtn = document.querySelector("#next");

  //   state

  const state = {
    points: 0,
    penaltyPoints: 0,
  };
};

quizApp();
