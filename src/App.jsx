import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ListToDoComponent from "./components/ListToDoComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToDoComponent from "./components/ToDoComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginCompenent from "./components/LoginCompenent";
import { isUserLoggedIn } from "./services/AuthService";

function App() {
  function AuthenticatedRoute({ children }) {
    if (isUserLoggedIn()) {
      return children;
    }
    return <Navigate to="/" />;
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<LoginCompenent />}></Route>

          <Route
            path="/todos"
            element={
              <AuthenticatedRoute>
                <ListToDoComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/add-todo"
            element={
              <AuthenticatedRoute>
                <ToDoComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/update-todo/:id"
            element={
              <AuthenticatedRoute>
                {" "}
                <ToDoComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          {/* http://localhost:8080/register */}
          <Route path="/register" element={<RegisterComponent />}></Route>
          {/* http://localhost:8080/login */}
          <Route path="/login" element={<LoginCompenent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
