import React, { useRef, useState } from "react";
import style from "./Order.module.scss";
import { Navigate } from "react-router-dom";
import { BsQuestionCircle, BsShieldFillCheck } from "react-icons/bs";
import { LuRotateCw } from "react-icons/lu";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { fetchGetUser } from "redux/slices/auth";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const Order = ({ isAuth }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const form = useRef();
  const dispatch = useDispatch();

  if (!isAuth || (isAuth && isAuth.cart.length === 0))
    return <Navigate to="/" />;

  const mapData = {
    center: [55.751574, 37.573856],
    zoom: 5,
  };

  const coordinates = [
    [55.684758, 37.738521],
    [57.684758, 39.738521],
  ];

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const orderProducts = async (event) => {
    event.preventDefault();

    if (!isAuth) return;

    await axios.put("/product/addToOrders", { items: isAuth.cart });
    dispatch(fetchGetUser());

    await emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        "Bte1EjapjDkuVt8Kb"
      )
      .then(
        () => {
          console.log("Email sent successfully");
        },
        (error) => {
          console.log(error.text);
        }
      );

    toast("Product ordered successfully!");
  };

  return (
    <main className={style.order}>
      <section className={style.order__left}>
        <div className={style.order__left__block}>
          <h3>Buyer data</h3>

          <form ref={form}>
            <input
              type="tel"
              name="phone_num"
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Phone number"
            />
            <input
              type="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="E-Mail"
            />

            <input
              type="text"
              name="orders"
              hidden
              value={JSON.stringify(isAuth.cart)}
            />
          </form>
        </div>

        <div className={style.order__left__block}>
          <h3>Our stores</h3>

          <div className={style.order__left__block__map}>
            <div>
              <h3>In the mall "FM"</h3>
              <p>Simferopol, Mekhanizatorov, house 51</p>
              <p>Daily from 10:00 to 20:00</p>
            </div>
            <YMaps>
              <Map defaultState={mapData} height={180} className={style.order__map}>
                {coordinates.map((coordinate) => (
                  <Placemark geometry={coordinate} />
                ))}
              </Map>
            </YMaps>
          </div>
        </div>

        <button
          type="submit"
          disabled={!phoneNumber || !isValidEmail(email)}
          onClick={orderProducts}
        >
          Send
        </button>
      </section>

      <section className={style.order__right}>
        <ul className={style.order__list}>
          <li>
            <BsShieldFillCheck />
            <h4>Secure payment</h4>
            <p>Your payments are under reliable protection</p>
          </li>
          <li>
            <LuRotateCw />
            <h4>Easy return</h4>
            <p>We will refund the full amount or exchange the goods</p>
          </li>
          <li>
            <BsQuestionCircle />
            <h4>Need help?</h4>
            <p>8 800 999 11 11</p>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Order;
