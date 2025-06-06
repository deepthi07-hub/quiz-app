import React, { useState } from "react";
import questions from "../data/questions";
import "../styles/quiz.css";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState([]);

  const currentQ = questions[currentQuestion];
  const optionLabels = ["A", "B", "C", "D"];

  const handleOptionSelect = (option) => {
    if (!isSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQ.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswers((prev) => [
      ...prev,
      {
        question: currentQ.question,
        selected: selectedOption,
        correct: currentQ.answer,
        isCorrect,
      },
    ]);

    setIsSubmitted(true);
  };

  const handleNext = () => {
    const nextQ = currentQuestion + 1;

    if (nextQ < questions.length) {
      setCurrentQuestion(nextQ);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowScore(false);
    setAnswers([]);
  };

  const progressPercentage =
    ((currentQuestion + (isSubmitted ? 1 : 0)) / questions.length) * 100;

  if (showScore) {
    const totalQuestions = questions.length;
    const correct = answers.filter((ans) => ans.isCorrect).length;
    const wrong = totalQuestions - correct;

    return (
      <div className="quiz-box result">
        <h2 className="congrats-animation">🎉 Congratulations! 🎉</h2>
        <p className="highlight-msg">You’ve completed the quiz!</p>
        <p>
          You scored <strong>{score}</strong> out of <strong>{totalQuestions}</strong>
        </p>
        <p>
          {score === totalQuestions
            ? "🌟 Perfect Score! You're a genius!"
            : "👏 Great job finishing the quiz!"}
        </p>

        <div className="summary">
          <p>✅ Correct Answers: {correct}</p>
          <p>❌ Wrong Answers: {wrong}</p>
          <p>📋 Total Questions: {totalQuestions}</p>
        </div>

        <h3>📝 Review Your Answers:</h3>
        <ul className="options-list">
          {answers.map((ans, index) => (
            <li
              key={index}
              className={`option-item ${ans.isCorrect ? "correct" : "wrong"}`}
            >
              <strong>Q{index + 1}:</strong> {ans.question}
              <br />
              <strong>Your Answer:</strong> {ans.selected}
              <br />
              <strong>Correct Answer:</strong> {ans.correct}
            </li>
          ))}
        </ul>

        <button onClick={handleRestart}>🔁 Try Again</button>
      </div>
    );
  }

  return (
    <div className="quiz-box">
      <div className="progress-container">
        <span className="question-counter">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <h3>
        Q{currentQuestion + 1}. {currentQ.question}
      </h3>

      <ul className="options-list">
        {currentQ.options.map((option, index) => {
          const isCorrect = isSubmitted && option === currentQ.answer;
          const isWrong =
            isSubmitted && selectedOption === option && !isCorrect;
          const isSelected = selectedOption === option;

          return (
            <li
              key={index}
              className={`option-item 
                ${isSelected ? "selected" : ""} 
                ${isCorrect ? "correct" : ""} 
                ${isWrong ? "wrong" : ""}`}
              onClick={() => handleOptionSelect(option)}
              role="button"
              aria-pressed={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleOptionSelect(option);
              }}
            >
              <span className="option-label">{optionLabels[index]}.</span>{" "}
              {option}
            </li>
          );
        })}
      </ul>

      <div className="button-row">
        <button
          onClick={handleSubmit}
          disabled={!selectedOption || isSubmitted}
        >
          Submit
        </button>

        {isSubmitted && (
          <button onClick={handleNext}>
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
