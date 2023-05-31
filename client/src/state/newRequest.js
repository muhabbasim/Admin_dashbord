import axios from "axios";
// require('dotenv').config()
const newRequest = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  // withCredentials: true,
});

export default newRequest;