import React from "react";
import { useNavigate } from "react-router-dom";
import "./Instructions.css"; // Make sure this file has the updated CSS below

const Instructions = () => {
  const navigate = useNavigate();

  return (
    <div className="instructions-container">
      <div className="instructions-box">
        <h2>📘 Quiz Instructions</h2>
        <p className="instructions-description">
          Welcome to the React Quiz! Please read the instructions carefully before starting.
        </p>
        <ol className="instructions-list">
          <li>Each question contains multiple options, but only one is correct.</li>
          <li>After selecting an answer, click "Next" to proceed to the next question.</li>
          <li>You cannot go back and change your answer once it is submitted.</li>
          <li>There is no time limit — take your time and answer carefully.</li>
          <li>Your final score will be displayed at the end of the quiz.</li>
        </ol>
        <button className="back-button" onClick={() => navigate("/")}>⬅ Back to Home</button>
      </div>
    </div>
  );
};

export default Instructions;
