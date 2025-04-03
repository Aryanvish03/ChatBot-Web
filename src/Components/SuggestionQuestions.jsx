import React from 'react'

const SuggestionQuestions = () => {
      const suggestedQuestions = [
        "What is your name?",
        "Tell me a joke.",
        "How does AI work?",
        "What is the weather today?",
      ];
  return (
    <div className="suggested-questions flex flex-row items-center justify-center gap-3">
    {suggestedQuestions.map((q, idx) => (
        <div>
      <button key={idx} onClick={() => setQuestion(q)} className="suggestion p-2 border border-black rounded-md">{q}</button>
        </div>
       
    
   ))}
   </div>
   
  )
}

export default SuggestionQuestions