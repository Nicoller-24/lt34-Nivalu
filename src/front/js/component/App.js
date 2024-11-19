// App.js
import React, { useState } from 'react';
import { getChatCompletion } from './openaiAPI';
import PropTypes from 'prop-types';

function App(props) {
  const [titulo, setTitulo] = useState('');
  const [recomendacion, setRecomendacion] = useState('');

  // Función para obtener un índice aleatorio en un array
  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Construcción del mensaje de usuario
  const buildUserMessage = () => {
    const haveVerb = "tengo una reservación para";
    const occasion = props.ocassion
    const recommendationQuestion = "que me recomiendas hacer antes o después de la reserva si es en esta fecha y hora";
    const mealType = props.time

    return `${haveVerb}  ${occasion}, ${recommendationQuestion} ${mealType}`;
  };

  const handleSendMessage = async () => {
    // Genera el mensaje del usuario dinámicamente
    const userMessage = buildUserMessage();

    const messages = [
      {
        role: 'system',
        content:
          "Responde únicamente con un objeto JSON que contenga solo las propiedades solicitadas, sin envolturas de código ni explicaciones adicionales. El JSON debe tener el formato exacto: {\"titulo\": \"...\", \"recomendacion\": \"...\"}",
      },
      {
        role: 'user',
        content: userMessage,
      },
    ];

    // Llama a la API y obtiene la respuesta
    const response = await getChatCompletion(messages);

    // Intenta parsear la respuesta a un objeto JSON
    try {
      const jsonResponse = JSON.parse(response);
      setTitulo(jsonResponse.titulo);
      setRecomendacion(jsonResponse.recomendacion);
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
      onClick={handleSendMessage}>Recomends</button>
      {titulo && recomendacion && (
        <div>
          <h2>Title:</h2>
          <p>{titulo}</p>
          <h2>Recommendation:</h2>
          <p>{recomendacion}</p>
        </div>
      )}
    </div>
  );
}

export default App;
