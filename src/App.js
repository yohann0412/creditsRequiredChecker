import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentGPA, setCurrentGPA] = useState(0.0);
  const [creditsCompleted, setCreditsCompleted] = useState(0.0);
  const [creditsRemaining, setCreditsRemaining] = useState(0.0);
  const [maxPossibleGPA, setMaxPossibleGPA] = useState(0.0);
  const [creditsNeeded, setCreditsNeeded] = useState({ 3.7: 0.0, 3.8: 0.0, 3.9: 0.0 });
  const calculateCreditsNeeded = (currentGPA, completedCredits, targetGPA) => {
    if (currentGPA >= targetGPA) return 0;
    if (targetGPA > 4.0) return Infinity;  // Impossible to achieve
  
    const currentPoints = currentGPA * completedCredits;
    const maxAdditionalCredits = 1000;  // Set a reasonable maximum
  
    for (let additionalCredits = 1; additionalCredits <= maxAdditionalCredits; additionalCredits++) {
      const totalCredits = completedCredits + additionalCredits;
      const totalPoints = currentPoints + (4.0 * additionalCredits);
      const newGPA = totalPoints / totalCredits;
      console.log(`Iteration ${additionalCredits} - GPA: ${newGPA}`);
      if (newGPA >= targetGPA) {
        return additionalCredits;
      }
    }
  
    return Infinity;  // Target GPA not achievable within the credit limit
  };
  
  const calculateGPA = () => {
    const current = parseFloat(currentGPA);
    const completed = parseFloat(creditsCompleted);
    const remaining = parseFloat(creditsRemaining);
  
    if (isNaN(current) || isNaN(completed) || isNaN(remaining)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }
  
    const totalCredits = completed + remaining;
    const maxPossible = ((current * completed) + (4.0 * remaining)) / totalCredits;
    setMaxPossibleGPA(maxPossible.toFixed(2));
  
    setCreditsNeeded({
      3.7: calculateCreditsNeeded(current, completed, 3.7),
      3.8: calculateCreditsNeeded(current, completed, 3.8),
      3.9: calculateCreditsNeeded(current, completed, 3.9)
    });
  };

  return (
    <div className="container">
      <h1>Maximum GPA Calculator</h1>
      <div className="input-group">
        <label htmlFor="GPA">Current GPA</label>
        <input
          id="GPA"
          value={currentGPA}
          onChange={(e) => setCurrentGPA(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="CreditsCompleted">Credits Completed</label>
        <input
          id="CreditsCompleted"
          value={creditsCompleted}
          onChange={(e) => setCreditsCompleted(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="CreditsRemaining">Credits Remaining</label>
        <input
          id="CreditsRemaining"
          value={creditsRemaining}
          onChange={(e) => setCreditsRemaining(e.target.value)}
        />
      </div>
      <button onClick={calculateGPA}>Calculate GPA and Credits Needed</button>
      {maxPossibleGPA !== null && (
        <div className="result">
          <p>Highest Possible GPA: {maxPossibleGPA}</p>
          <p>Credits needed for 3.7 GPA: {creditsNeeded[3.7]}</p>
          <p>Credits needed for 3.8 GPA: {creditsNeeded[3.8]}</p>
          <p>Credits needed for 3.9 GPA: {creditsNeeded[3.9]}</p>
        </div>
      )}
    </div>
  );
}

export default App;
