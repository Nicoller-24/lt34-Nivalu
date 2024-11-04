// App.js
import React, { useState } from 'react';
import { getChatCompletion } from './openaiAPI';

function App() {
  const [titulo, setTitulo] = useState('');
  const [recomendacion, setRecomendacion] = useState('');

  // Función para obtener un índice aleatorio en un array
  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Construcción del mensaje de usuario
  const buildUserMessage = () => {
    const haveVerb = "tengo";
    const age = getRandomItem(["18", "24", "28", "32", "38" , "45", "50"]);
    const years = "años y";
    const occasion = getRandomItem(["me retiro", "me ascendieron", "me graduo", "cumplo años", "me comprometo"]);
    const recommendationQuestion = "que me recomienda hacer antes o después de la reserva de";
    const mealType = getRandomItem(["almuerzo", "cena", "desayuno"]);
    const finalSentence = "que tengo";

    return `${haveVerb} ${age} ${years} ${occasion}, ${recommendationQuestion} ${mealType} ${finalSentence}`;
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
      <button onClick={handleSendMessage}>Recomienda</button>
      {titulo && recomendacion && (
        <div>
          <h2>Título:</h2>
          <p>{titulo}</p>
          <h2>Recomendación:</h2>
          <p>{recomendacion}</p>
        </div>
      )}
    </div>
  );
}

export default App;
