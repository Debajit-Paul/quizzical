import { nanoid } from "nanoid";
import crossIcon from "./cross.svg";
import tickIcon from "./tick.svg";
import "./question.css";

export default function Question(props) {
  const incorrectAnswerElements = props.incorrectAnswer.map((answer) => {
    const incorrectAnswerClassName = `
              ${
                props.selectedAnswer === answer
                  ? "questionSelected"
                  : "questionBtn"
              }
              ${
                props.showAnswer &&
                props.selectedAnswer === answer &&
                "incorrectQuestionSelected"
              }`;

    return (
      <button
        key={nanoid()}
        className={incorrectAnswerClassName}
        onClick={() => props.handleSelectedAnswer(props.id, answer)}
      >
        {answer}
      </button>
    );
  });

  const correctAnswerClassName = `${
    props.selectedAnswer === props.correctAnswer
      ? "questionSelected"
      : "questionBtn"
  }
  ${props.showAnswer && "correctQuectionBtn"}`;

  const correctAnswerElement = (
    <button
      key={nanoid()}
      className={correctAnswerClassName}
      onClick={() => props.handleSelectedAnswer(props.id, props.correctAnswer)}
    >
      {props.correctAnswer}
    </button>
  );

  incorrectAnswerElements.push(correctAnswerElement);

  const sortedAnswerElements = incorrectAnswerElements.sort((a, b) =>
    a.props.children.localeCompare(b.props.children)
  );

  return (
    <article className="question-container">
      <div>
        <h3 className="question-text">{props.question}</h3>
        {sortedAnswerElements}
      </div>

      {props.showAnswer &&
        (props.correctAnswer === props.selectedAnswer ? (
          <img src={tickIcon} width={35} alt="correct" />
        ) : (
          <img src={crossIcon} width={35} alt="wrong" />
        ))}
    </article>
  );
}
