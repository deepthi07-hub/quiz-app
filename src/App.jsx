import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import QuizHome from "./pages/QuizHome";
import Instructions from "./pages/Instructions";
import Quiz from "./components/Quiz";
import { AuthContext } from "./contexts/AuthContext";
import Layout from "./components/Layout"; // 👈 New responsive layout wrapper

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Signup />
        }
      />

      {/* Protected Routes */}
      {isAuthenticated ? (
        <>
          <Route
            path="/"
            element={
              <Layout>
                <QuizHome />
              </Layout>
            }
          />
          <Route
            path="/instructions"
            element={
              <Layout>
                <Instructions />
              </Layout>
            }
          />
          <Route
            path="/quiz"
            element={
              <Layout>
                <Quiz />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default App;
