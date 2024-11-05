// openaiApi.js
import axios from 'axios';

const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;  

export const getChatCompletion = async (messages) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'chatgpt-4o-latest',
        messages: messages,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching completion:', error);
    return null;
  }
};
