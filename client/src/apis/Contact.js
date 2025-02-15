import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/send-message"
    : "http://localhost:3001/api/send-message";

export default axios.create({
  baseURL,
});
