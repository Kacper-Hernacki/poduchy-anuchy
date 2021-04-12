import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/poduchy-anuchy/us-central1/api', // hte api (cloud function) url
});

export default instance;
