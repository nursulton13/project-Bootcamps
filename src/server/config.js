import axios from "axios";
import { API_URL, Token } from "./../const/index";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: 'Bearer '+ localStorage.getItem(Token) },
});

export const httpRequest = (config) => {
  return axiosInstance(config);
};
