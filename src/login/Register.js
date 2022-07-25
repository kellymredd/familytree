import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useLogin from "../hooks/useLogin.hook.js";

export default function RegisterScreen() {
  const history = useHistory();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errMessage, setErrMessage] = useState(null);
  const { login, signUp } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();

    // add context to store this state and display messaging
    const status = await signUp(form).catch(
      (error) => console.log(error.response.data.err) // use this object to display errors in UI
    );

    if (status === 201) {
      // user created
      history.push("/login");
    } else if (status === 400) {
      // express forces messages to be sent so use those
      // ?? how?? //setErrMessage(err)
      console.log("Username and Password are required");
    } else if (status === 409) {
      console.log("Username is already taken");
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
      <header>Create an Account</header>
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
            autoFocus
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
        <footer>
          <Link className="btn btn-link" to="/login">
            Log in
          </Link>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={!form.username || !form.password}
          >
            Create Account
          </button>
        </footer>
      </form>
    </div>
  );
}
