import Flash from "./components/Flash";
import "./styles.css";
import React, { useState } from "react";
import Quizboard from "./components/Quizboard";

export default function App() {
  const [gameStart, setGameStart] = useState(false);

  const startQuiz = () => setGameStart((preState) => !preState);

  return (
    <div className="App">
      {gameStart ? (
        <div className="quizboard-container">
          <Quizboard gameStart={setGameStart} />
        </div>
      ) : (
        <Flash start={startQuiz} />
      )}
    </div>
  );
}
