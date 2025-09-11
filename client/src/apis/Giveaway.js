import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/giveaway"
    : "http://localhost:3001/api/giveaway";

export default axios.create({
  baseURL,
});
