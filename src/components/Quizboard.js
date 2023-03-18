import { useState, useEffect } from "react";
import Question from "./Question";
import "./quizboard.css";

const getData = async () => {
  const url =
    "https://the-trivia-api.com/api/questions?categories=science,food_and_drink,history&limit=5&region=IN&difficulty=easy";
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default function Quizboard(props) {
  const [questionArray, setQuestionArray] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [scoreCounter, setScoreCounter] = useState("");

  const allQuestionAnswered = questionArray.every(
    (question) => question.selectedAnswer !== ""
  );

  useEffect(() => {
    getData().then((questions) => {
      return setQuestionArray(
        questions.map((question) => {
          return {
            ...question,
            selectedAnswer: "",
            showAnswer: false
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    if (questionArray !== 0) {
      let scoreCounter = 0;
      questionArray.forEach((question) => {
        if (question.correctAnswer === question.selectedAnswer) scoreCounter++;
      });
      setScoreCounter(scoreCounter);
    }
  }, [questionArray]);

  function handleSelectedAnswer(questionId, answer) {
    if (!isGameOver) {
      setQuestionArray((preQuestionArray) =>
        preQuestionArray.map((question) =>
          question.id === questionId
            ? { ...question, selectedAnswer: answer }
            : question
        )
      );
    }
  }

  function checkAnswer() {
    if (allQuestionAnswered) {
      setIsGameOver(true);

      setQuestionArray((preQuestionArray) =>
        preQuestionArray.map((question) => ({ ...question, showAnswer: true }))
      );
    }
  }

  function restartGame() {
    setIsGameOver(false);
    props.gameStart(false);
  }

  const questionElements = questionArray.map((question) => (
    <Question
      key={question.id}
      id={question.id}
      question={question.question}
      correctAnswer={question.correctAnswer}
      incorrectAnswer={question.incorrectAnswers}
      selectedAnswer={question.selectedAnswer}
      showAnswer={question.showAnswer}
      handleSelectedAnswer={handleSelectedAnswer}
    />
  ));

  return (
    <div className="quizboard-container">
      {questionElements}

      <div className="bottom-container">
        {isGameOver && (
          <h3 className="correctAnswer-text">
            You scored {scoreCounter}/5 correct answers
          </h3>
        )}

        <button
          className={allQuestionAnswered ? "primaryBtn" : "primaryBtn-disable"}
          onClick={isGameOver ? restartGame : checkAnswer}
        >
          {isGameOver ? "Play Again" : "Show Result"}
        </button>
      </div>
    </div>
  );
}
