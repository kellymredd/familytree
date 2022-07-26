import http from "../http/http";

export default function useLogin() {
  function login(form) {
    return http
      .post(`/api/login`, form)
      .then((resp) => resp)
      .catch((err) => err);
  }

  async function signUp(form) {
    const { status } = await http.post("/api/register", form, {
      withCredentials: "include",
    });

    return status;
  }

  return {
    login,
    signUp,
  };
}
