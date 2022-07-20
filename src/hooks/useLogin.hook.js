import http from "../http/http";

export default function useLogin() {
  function login(form) {
    return http
      .post(`/api/login`, form)
      .then((resp) => resp)
      .catch((err) => err);
  }

  return {
    login,
  };
}
