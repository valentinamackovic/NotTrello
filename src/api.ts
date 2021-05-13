import axios from "axios";

const key = window.localStorage.getItem("key");
const token = window.localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: `https://api.trello.com/1/`,
  params: {
    key,
    token,
  },
});

export const setKeyAndToken = (key: string, token: string) => {
  axiosInstance.defaults.params = {
    key,
    token,
  };
};

export const resetParams = () => {
  axiosInstance.defaults.params = {};
};

export default axiosInstance;
