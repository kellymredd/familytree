import axios from "axios";

const http = axios.create({
  //authorization: `bearer ${token}`,
  // How does ulEntity pass it along? PureOHS stores in sessionStorage in a user object.
  //HOW TO REFRESH THIS THANG?!????!?
  withCredentials: true,
});

export default http;
