// App.js
import React, { useState } from 'react';
import { getChatCompletion } from './openaiAPI';
import PropTypes from 'prop-types';

function App(props) {
  const [title, setTitle] = useState('');
  const [recommendation, setRecommendation] = useState('');

  // Function to get a random item from an array
  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Build user message
  const buildUserMessage = () => {
    const haveVerb = "I have a reservation for";
    const occasion = props.ocassion;
    const recommendationQuestion = "What do you recommend I do before or after the reservation if it is on this date and time?";
    const mealType = props.time;

    return `${haveVerb} ${occasion}. ${recommendationQuestion} ${mealType}`;
  };

  const handleSendMessage = async () => {
    // Generate the user message dynamically
    const userMessage = buildUserMessage();

    const messages = [
      {
        role: 'system',
        content:
          "Respond only with a JSON object containing the requested properties, without code wrappers or additional explanations. The JSON must have the exact format: {\"title\": \"...\", \"recommendation\": \"...\"}",
      },
      {
        role: 'user',
        content: userMessage,
      },
    ];

    // Call the API and get the response
    const response = await getChatCompletion(messages);

    // Attempt to parse the response into a JSON object
    try {
      const jsonResponse = JSON.parse(response);
      setTitle(jsonResponse.title);
      setRecommendation(jsonResponse.recommendation);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: "#e75b1e",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onClick={handleSendMessage}
      >
        Recommend
      </button>
      {title && recommendation && (
        <div>
          <h2>Title:</h2>
          <p>{title}</p>
          <h2>Recommendation:</h2>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
