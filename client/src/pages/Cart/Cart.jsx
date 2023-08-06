import React, { useEffect, useState } from "react";
import style from "./Cart.module.scss";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { fetchGetUser } from "redux/slices/auth";
import { toast } from "react-toastify";
import Loader from "components/Loader/Loader";

const Cart = ({ isAuth }) => {
  const [data, setData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const onClickRemoveProduct = async (_id) => {
    await axios.put(`/product/removeFromCart/${_id}`);
    dispatch(fetchGetUser());
    toast("You have successfully removed product!");
  };

  useEffect(() => {
    if (isAuth && isAuth.cart.length !== 0) {
      axios
        .get(`/product/getAfew/${JSON.stringify(isAuth.cart)}`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [isAuth]);

  useEffect(() => {
    if (data && data.length !== 0) {
      setTotalCost(data.map(({ amount }) => amount));
    } else {
      setTotalCost([0]);
    }
  }, [data]);

  if (!isAuth) return <Navigate to="/" />;

  return (
    <main className={style.cart}>
      {!loading ? (
        <>
          <section>
            <h3>Cart</h3>

            <ul className={style.cart__list}>
              {data.map(({ title, images, amount, _id }) => (
                <li key={_id + Math.random()}>
                  <Link to={`/product/${_id}`}>
                    <img
                      src={process.env.REACT_APP_API_URL + images[0]}
                      alt="product"
                    />

                    <div>
                      <p>{title}</p>
                      <button onClick={() => onClickRemoveProduct(_id)}>
                        Remove
                      </button>
                    </div>

                    <h3 className={style.cart__list__price}>{amount}$</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className={style.cart__menu}>
              <div className={style.cart__menu__title}>
                <h3>Order conditions</h3>
              </div>

              <div className={style.cart__menu__total}>
                <p>
                  <span>Total:</span> {data.length} products
                </p>

                <h3>{totalCost.reduce((acc, number) => acc + number, 0)}$</h3>
              </div>

              <div className={style.cart__menu__link}>
                <Link to="/cart/order">Go to checkout</Link>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>{data.length !== 0 ? <Loader /> : <h2>Cart is empty</h2>}</>
      )}
    </main>
  );
};

export default Cart;
