import axios from "axios";

//https://blog.logrocket.com/understanding-axios-create/
export const BaseURL = "http://10.0.2.2:3000";

export const Axios = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
