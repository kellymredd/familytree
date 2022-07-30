import axios from "axios";

const http = axios.create({
  // How does ulEntity pass it along? PureOHS stores in sessionStorage in a user object.
  withCredentials: true, // this is CORS related; might not be necessary
  // should i use interceptors: https://github.com/axios/axios/issues/1383
  // headers: {
  //   "Content-type": "application/json",
  //   Authorization: `Bearer ${Cookies.get("jid")}`,
  // },
});

export default http;
