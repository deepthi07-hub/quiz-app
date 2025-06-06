import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Quiz from "../components/Quiz";
import logo from "../assets/logo.jpg";
import { AuthContext } from "../contexts/AuthContext";
import "../App.css";

const QuizHome = () => {
  const [start, setStart] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <div className="app-container">
      {!start ? (
        <div className="start-screen">
          <img src={logo} alt="App Logo" className="logo" />
          <h1>🧠 React Quiz App</h1>
          <p className="intro-text">
            Welcome to the quiz! Test your knowledge by answering a few multiple-choice questions.
          </p>
          <div className="button-group">
            <button onClick={() => setStart(true)} className="light-blue-border-button">
              Start Quiz
            </button>
            <button onClick={() => navigate("/instructions")} className="light-blue-border-button">
              Description & Instructions
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="light-blue-border-button"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1>🧠 React Quiz App</h1>
          <Quiz />
        </>
      )}
    </div>
  );
};

export default QuizHome;
