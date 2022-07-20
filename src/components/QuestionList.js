import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(questD => setQuestions(questD))
  }, []);

  function handleDeleteQuestion(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(r => r.json())
    .then(() => {
      const yeetedAndDeleted = questions.filter((question) => question.id !== id)
      setQuestions(yeetedAndDeleted)
    })
  }

  function handleChangeAnswer(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex
      })
    })
    .then(r => r.json())
    .then((updatePatch) => {
      const updatePatches = questions.map((question) => {
        if(question.id === updatePatch.id) {return updatePatch}else
        {return question}
      })
      setQuestions(updatePatches)
    })
  }
  
  const toBeSeen = questions.map((question) => {
    return <QuestionItem key={question.id} question={question} deleteQuest={handleDeleteQuestion} changes={handleChangeAnswer}/>
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{toBeSeen}</ul>
    </section>
  );
}

export default QuestionList;