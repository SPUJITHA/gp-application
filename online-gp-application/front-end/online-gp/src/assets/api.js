// api.js

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8083/', // Change this to your Spring Boot server address
});

export default API;
