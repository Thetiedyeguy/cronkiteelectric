import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/reviews"
    : "http://localhost:3001/api/reviews";

export default axios.create({
  baseURL,
});
