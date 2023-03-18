import "./flash.css";

export default function Flash(props) {
  return (
    <div className="flash--container">
      <div className="flash">
        <h1 className="flash--title">Quizzical</h1>
        <p className="flash--tagline">
          Answer the questions and test your knowledge!
        </p>
        <button className="flash--btn" onClick={props.start}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}
