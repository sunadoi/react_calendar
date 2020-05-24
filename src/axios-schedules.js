import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-calendar-c4a47.firebaseio.com/",
});

export default instance;
