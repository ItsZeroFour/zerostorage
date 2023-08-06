import React, { useState } from "react";
import style from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "redux/slices/auth";
import { toast } from "react-toastify";

const Regsiter = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const createUserOnSubmit = async (event) => {
    event.preventDefault();

    const data = await dispatch(
      fetchRegister({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      })
    );

    if (!data.payload) {
      return toast(
        "Failed to register! Try to change your email address or phone number or try again layter"
      );
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }

    navigate("/");
  };

  if (isAuth) {
    toast("You'r already authorizated");
    return navigate("/");
  }

  return (
    <main className={style.register}>
      <h2>Registration</h2>

      <form className={style.register__form} onSubmit={createUserOnSubmit}>
        <input
          type="text"
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="First name"
        />
        <input
          type="text"
          onChange={(event) => setLastName(event.target.value)}
          placeholder="Last name"
        />
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
        <input
          type="tel"
          onChange={(event) => setPhoneNumber(event.target.value)}
          placeholder="Phone number"
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/register">Log in</Link>!
      </p>
    </main>
  );
};

export default Regsiter;
