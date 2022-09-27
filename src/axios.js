import axios from 'axios';

//создаем новую оболочку
const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

export default instance;
