import React from "react";

function QuestionItem({ question, deleteQuest, changes }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers ? answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  )): null;

  function onDeleteQuest(){
    deleteQuest(question.id)
  }

  function onChanges(e){
    changes(id, parseInt(e.target.value))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={onChanges}>{options}</select>
      </label>
      <button onClick={onDeleteQuest}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
