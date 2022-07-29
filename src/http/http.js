import axios from "axios";

const http = axios.create({
  // How does ulEntity pass it along? PureOHS stores in sessionStorage in a user object.
  withCredentials: true, // is this a header???
  // should i use interceptors
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${Cookies.get("jwt")}`,
  },
});

export default http;
