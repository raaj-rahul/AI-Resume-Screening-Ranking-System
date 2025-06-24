// src/api/quizApi.ts
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/questions';

export const fetchQuestions = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const generateQuestion = async (topic: string) => {
  const response = await axios.post(`${API_BASE}/generate`, null, {
    params: { topic }
  });
  return response.data;
};
