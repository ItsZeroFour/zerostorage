import React, { useState } from "react";
import style from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogin } from "redux/slices/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginOnSubmit = async (event) => {
    event.preventDefault();

    const data = await dispatch(fetchLogin({ email, password }));

    if (!data.payload) {
      return toast("Failed to login");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }

    navigate("/");
  };

  return (
    <main className={style.login}>
      <h2>Login</h2>

      <form className={style.login__form} onSubmit={loginOnSubmit}>
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Do not have an account? <Link to="/register">Register</Link>!
      </p>
    </main>
  );
};

export default Login;
