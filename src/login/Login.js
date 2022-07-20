import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useLogin from "../hooks/useLogin.hook.js";

export default function LoginScreen() {
  const history = useHistory();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errMessage, setErrMessage] = useState(null);
  const { login } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();

    const isAuthenticated = await login(form);

    if (isAuthenticated) {
      history.push("/");
    } else {
      setErrMessage(
        "Username or password not found. Please try logging in again."
      );
    }
  }

  function handleFormChange(e, name) {
    setForm((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  }

  return (
    <div className="loginFormWrapper">
      {errMessage ? (
        <div className="alert alert-warning">{errMessage}</div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="formField">
          <input
            className="form-control"
            type="text"
            value={form.username}
            onChange={(e) => handleFormChange(e, "username")}
            required
            placeholder="USERNAME"
          />{" "}
        </div>
        <div className="formField">
          <input
            className="form-control"
            type="text"
            value={form.password}
            onChange={(e) => handleFormChange(e, "password")}
            required
            placeholder="PASSWORD"
          />
        </div>
        <div className="formField">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!form.username || !form.password}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
