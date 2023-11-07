import axios from "axios";

//https://blog.logrocket.com/understanding-axios-create/
export const BaseURL = "http://127.0.0.1:3000";

export const Axios = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
