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

const quizApp = function () {
  const questionEl = document.querySelector("#question");

  const answerBtn_01 = document.querySelector("#answerButton_00");
  const answerBtn_02 = document.querySelector("#answerButton_01");
  const answerBtn_03 = document.querySelector("#answerButton_02");
  const answerBtn_04 = document.querySelector("#answerButton_03");

  const displaySolutionBtn = document.querySelector("#result");
  const nextBtn = document.querySelector("#next");

  //   state

  const state = {
    correctAnswerIndex: 0,
    currentQuestion: 1,
    points: 0,
    penaltyPoints: 0,
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

  const initialize = function () {
    displayAnswers();
  };

  const checkSelection = function (e) {
    const selectedButton = e.target;
    const targetID = +selectedButton.dataset.id;
    const correctBtn = document.querySelector(
      `#answerButton_0${state.correctAnswerIndex}`
    );

    if (targetID === state.correctAnswerIndex) {
      // if correct
      selectedButton.classList.add("correct");
    } else {
      // if incorrect
      correctBtn.classList.add("correct");
      selectedButton.classList.add("wrong");
    }
  };

  initialize();

  // Click function
  answerBtn_01.addEventListener("click", checkSelection);
  answerBtn_02.addEventListener("click", checkSelection);
  answerBtn_03.addEventListener("click", checkSelection);
  answerBtn_04.addEventListener("click", checkSelection);
};

quizApp();
