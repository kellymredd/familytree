import axios from "axios";

// const http = axios;
const http = axios.create({
  Authorization: `Bearer ${token}`, // how is PureOHS doing this? how does ulEntity get it; do we store it in express session or session storage?
  withCredentials: true,
});

export default http;
