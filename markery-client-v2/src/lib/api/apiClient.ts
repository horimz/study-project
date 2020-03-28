import axios from 'axios';
import { storage } from '../storage';

var host;

if (process.env.NODE_ENV === 'development') {
  host = '/';
} else {
  host = process.env.REACT_APP_API_HOST || '/';
}

const token = storage.getItem('TOKEN') || false;

const apiClient = axios.create({
  baseURL: host,
  withCredentials: true
});

apiClient.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

if (token) {
  // If headers are set in constructor configuration they cannot be changed
  apiClient.defaults.headers.common['Authorization'] = token;
}

export { apiClient };
