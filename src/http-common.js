import axios from "axios";

export default axios.create({
  baseURL: "https://danny-demo-backend.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});
