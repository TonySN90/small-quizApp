"use strict";

import "./../scss/style.scss";
// import "data.js";

const quizApp = function () {};

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
];

console.log(questionData);
quizApp();
