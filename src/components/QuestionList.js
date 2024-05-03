import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  // When the application loads, get all the questions from http://localhost:4000/questions and display them using the QuestionList component.
  useEffect(() => {
    // fetch questions
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      // set state with questions
      .then((data) => setQuestions(data))
    
  }, []);

  // When the delete button is clicked, the question should be removed from the list by updating state. It should also be deleted on the server.
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions);
      })
  }

  // When the user clicks the 'View Questions' button, a list of all the questions should show up (from deliverable 1). When the dropdown for the correct answer is changed, the question should be updated on the server. It should also be updated in state.

  // PATCH /questions/:id

  // Required Headers:
  // { "Content-Type": "application/json" }

  // Body:
  // {
  //   "correctIndex": integer
  // }
  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((question) => {
          if (question.id === updatedQuestion.id) return updatedQuestion;
          return question;
        });
        setQuestions(updatedQuestions);
      });
  }

  const questionItems = questions.map((question) => (
    <QuestionItem key={question.id} question={question} handleDelete={handleDelete} handleUpdate={handleAnswerChange}/>
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;