import React from 'react'

export default function CreateQuiz() {
  return (
    <div className="quiz-container">
      <div className="quiz-questions-container">
        <span>5/10</span>
        <p>Isme sey class teacher ka kaun chatta tha?</p>
      </div>
      <div className="quiz-options">
        <div className="direction">
          Choose the correct answer.
        </div>
        <div className="option correct">
          Amit
        </div>
        <div className="option wrong">
          Ashish
        </div>
        <div className="option">
          Ankita
        </div>
        <div className="option">
          Swapna
        </div>
      </div>
    </div>
  )
}
