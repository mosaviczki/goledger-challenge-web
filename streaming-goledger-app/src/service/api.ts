import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_API_URL ?? "http://ec2-54-91-215-149.compute-1.amazonaws.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: process.env.NEXT_API_USER ?? "psAdmin",
    password: process.env.NEXT_API_PASSWORD ?? "goledger",
  },
});
console.log(process.env.NEXT_API_URL)
export default api;
