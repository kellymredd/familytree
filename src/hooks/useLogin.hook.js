import http from "../http/http";

export default function useLogin() {
async function login(form) {
    const response = await http
      .post(`/api/login`, form);

      if (response.status !== 200) throw Error(body.message);

    return response.data;
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
