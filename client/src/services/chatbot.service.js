import axios from "axios";

const chatbotService = axios.create({
  baseURL: "http://localhost:8000",
});

export default chatbotService;