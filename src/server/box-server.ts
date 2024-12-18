import axios from 'axios';

// Create boxServer instance
export const boxServer = axios.create({
  baseURL: 'http://localhost:3003/api/', // Adjust to your server URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true, // To include cookies in cross-origin requests
});
