import React, { useState, useEffect } from "react";
import { RiTimer2Line } from "react-icons/ri";
import StartScreen from "./StartScreen";
import "./main.css";
import questions from "../questions.json";
import Rating from "@mui/material/Rating";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Main = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [rating, setRating] = useState(0);
  const [scoreBar, setScoreBar] = useState({red: 0, orange: 0, yellow: 0,});
  const [answer, setAnswer] = useState({correct: 0, wrong: 0,});

  useEffect(() => {
    if (currentQuestion !== null) {
      setShuffledOptions(
        shuffleArray([
          questions[currentQuestion].correct_answer,
          ...questions[currentQuestion].incorrect_answers,
        ])
      );
      if (questions[currentQuestion].difficulty === "easy") {
        setRating(1);
      } else if (questions[currentQuestion].difficulty === "medium") {
        setRating(2);
      } else if (questions[currentQuestion].difficulty === "hard") {
        setRating(3);
      } else {
        setRating(0);
      }
      setUserAnswer(null);
      setTimeLeft(45);
    }
  }, [currentQuestion]);

  useEffect(() => {
    let timer = null;
    if (timeLeft > 0 && userAnswer === null) {
      timer = setTimeout(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    } else if (timeLeft === 0 && userAnswer === null) {
      setUserAnswer("Time's up!");
    }
    return () => clearTimeout(timer);
  }, [timeLeft, userAnswer]);

  const handleOptionClick = (option) => {
    if (userAnswer === null) {
      const currentQuestionData = questions[currentQuestion];

      if (option === currentQuestionData.correct_answer) {
        setAnswer((answer) => ({ ...answer, correct: answer.correct + 1 }));
        setScore((prevScore) => prevScore + 1);
        setScoreBar({ ...scoreBar, orange: orangeBar(), yellow: yellowBar() });
        setUserAnswer("Correct!");
      } else {
        setAnswer((answer) => ({ ...answer, wrong: answer.wrong + 1 }));
        setScoreBar({ ...scoreBar, red: redBar(), yellow: yellowBar() });
        setUserAnswer("Incorrect!");
        
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setCurrentQuestion(null);
    }
  };

  const progress =
    currentQuestion !== null
      ? ((currentQuestion + 1) / questions.length) * 100
      : 100;

  if (currentQuestion === null) {
    return <StartScreen onStartQuiz={() => setCurrentQuestion(0)} />;
  }
  const yellowBar = () => {
    return (
      ((currentQuestion + 1) / questions.length) * 100 - scoreBar.orange - scoreBar.red);
  };
  const redBar = () => {
    return ((answer?.wrong + 1) / questions.length) * 100;
  };
  const orangeBar = () => {
    return ((answer?.correct + 1) / questions.length) * 100;
  };

  return (
    <div className="main-card">
      <div className="progress-barr">
        <div className="progresss" style={{ width: `${progress}%` }}></div>
      </div>
      <h6 className="current_score">Your Score: {score}</h6>
      <p className="category">{questions[currentQuestion].category}</p>

      <div className="question-timer-container">
        <h1 className="current_questionNo">
          Question {currentQuestion + 1} of {questions.length}
        </h1>
        <div className="icon">
          <RiTimer2Line size={25} />
          <span style={{ color: "rgb(117, 117, 117)" }}>
            {timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`}
          </span>
        </div>
      </div>

      <div className="star">
        <Rating name="read-only" size="medium" value={rating} max={3} readOnly />
      </div>

      <div>
        <h1 className="display_question">
          {questions[currentQuestion].question}
        </h1>
        <ul>
          {shuffledOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={
                userAnswer
                  ? option === questions[currentQuestion].correct_answer
                    ? "correct"
                    : "incorrect"
                  : ""
              }
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      {/* Next Question button */}
      <div>
        {userAnswer && (
          <p
            className={`answer-text ${
              userAnswer === "Correct!" ? "correct" : "incorrect"
            }`}
          >
            {userAnswer}
          </p>
        )}
        <button className="button" onClick={handleNextQuestion}>
          Next Question
        </button>
      </div>
            <div className="container">
              <div className="d-flex justify-content-between">
                <div>Score{" "} {((answer?.correct / (currentQuestion + 1)) * 100).toFixed(0)} %
                </div>
                <div>
                  Max Score{" "}{((answer?.correct / questions.length) * 100).toFixed(0)} %
                </div>
              </div>
              <div className="border border-5 rounded-pill border-light">
                <div className="progress rounded-pill">
                  <div
                    className="progress-bar  rounded-end"
                    style={{width: `${scoreBar?.red}%`,backgroundColor: "#F89E68",}}
                  ></div>
                  <div
                    className="progress-bar rounded-end"
                    style={{width: `${scoreBar?.orange}%`,backgroundColor: "#FEBD5C",}}
                  ></div>
                  <div
                    className="progress-bar rounded-end"
                    style={{width: `${scoreBar?.yellow}%`,backgroundColor: "#F6E763",}}
                  ></div>
                  <div
                    className="progress-bar rounded-end"
                    style={{width: `${100 -scoreBar?.yellow -scoreBar?.orange -scoreBar?.red}%`,
                      backgroundColor: "#BAE17C",}}
                  ></div>
                </div>
              </div>
            </div>
    </div>
  );
};

export default Main;
