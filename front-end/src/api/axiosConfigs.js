import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

API.defaults.headers.common["Authorization"] = localStorage.getItem("auth");

export default API;
