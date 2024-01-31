import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ListToDoComponent from "./components/ListToDoComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDoComponent from "./components/ToDoComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginCompenent from "./components/LoginCompenent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<ListToDoComponent />}></Route>
          <Route path="/todos" element={<ListToDoComponent />}></Route>
          <Route path="/add-todo" element={<ToDoComponent />}></Route>
          <Route path="/update-todo/:id" element={<ToDoComponent />}></Route>
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
