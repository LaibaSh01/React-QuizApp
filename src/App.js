import React, { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleQuizCompleted = () => {
    setQuizCompleted(true);
  };

  const handleRetryQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
  };

  return (
    <div className="App">
      {!quizStarted && !quizCompleted ? (
        <StartScreen onStartQuiz={handleStartQuiz} />
      ) : quizStarted && !quizCompleted ? (
        <Main onQuizCompleted={handleQuizCompleted} />
      ) : (
        <StartScreen onStartQuiz={handleRetryQuiz} />
      )}
    </div>
  );
}

export default App;
