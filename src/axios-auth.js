import axios from "axios";

export const apiKey = process.env.VUE_APP_FIREBASE_API_KEY;

export const authAxiosInstance = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
});

export const dbAxiosInstance = axios.create({
  baseURL: "https://basket-app-68045.firebaseio.com",
});
axios.defaults.headers.get["Accepts"] = "application/json";
