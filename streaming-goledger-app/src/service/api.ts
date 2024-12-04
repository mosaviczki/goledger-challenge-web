import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: process.env.NEXT_API_USER as string,
    password: process.env.NEXT_API_PASSWORD as string,
  },
});

export default api;
