import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACK_URL,
});

export { api };
