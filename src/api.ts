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

// export default axios.create({
//   baseURL: `https://api.trello.com/1/`,
//   params: {
//     key: "2b33a0b362affd1dc02a2f6ca2ffd923",
//     token: "6a244a046f4b46f7a82a89bb7b151a8497a8f7df8075be76db635e0d7ddc5145",
//   },
// });

export const setKeyAndToken = (key: string, token: string) => {
  axiosInstance.defaults.params = {
    key,
    token,
  };
};

export default axiosInstance;
