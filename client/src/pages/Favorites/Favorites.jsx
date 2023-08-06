import React, { useEffect, useState } from "react";
import style from "./Favorites.module.scss";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import manWithMagnifyingGlass from "../../images/Catalog/manwithmagnifyingglass.svg";
import { useDispatch } from "react-redux";
import { fetchGetUser } from "redux/slices/auth";
import { toast } from "react-toastify";
import Loader from "components/Loader/Loader";

const Favorites = ({ isAuth }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [productInCart, setProductInCart] = useState(false);

  const dispatch = useDispatch();

  const addProductToCart = async (_id) => {
    try {
      const { data } = await axios.put(`/product/addToCart/${_id}`);

      dispatch(fetchGetUser());
      setProductInCart(true);

      if (data.success) toast("Product add successfully");
    } catch (err) {
      console.log(err);
      toast("Failed to add product to cart");
    }
  };

  const removeProductFromFavorites = async (id) => {
    if (!isAuth) return;

    await axios.put(`/product/removeFromFavorites/${id}`);
    dispatch(fetchGetUser());
    toast("product removed from favorites successfully!");
  };

  useEffect(() => {
    if (isAuth && isAuth.favorites.length !== 0) {
      axios
        .get(`/product/getAfew/${JSON.stringify(isAuth.favorites)}`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [isAuth]);

  return (
    <main className={style.favorites}>
      {!loading ? (
        <>
          {data && isAuth ? (
            <ul className={style.favorites__list}>
              {data.map((item) => (
                <li className={style.favorites__item} key={item._id}>
                  <Link
                    className={style.favorites__item__main}
                    to={`/product/${item._id}`}
                  >
                    <div>
                      <img
                        src={process.env.REACT_APP_API_URL + item.images[0]}
                        alt={item.title}
                      />
                    </div>

                    <div className={style.favorites__item__text}>
                      <h5>{item.title}</h5>

                      <div className={style.favorites__item__reviews}>
                        <p>{item.reviews.length} reviews</p>
                      </div>
                    </div>
                  </Link>

                  <div className={style.favorites__other}>
                    <h2>{new Intl.NumberFormat("en").format(item.amount)}$</h2>
                    {isAuth && isAuth.cart && (
                      <div className={style.favorites__buttons}>
                        <button
                          type="submit"
                          className={style.favorites__favorite__button}
                          onClick={() => removeProductFromFavorites(item._id)}
                        >
                          <AiOutlineHeart />
                        </button>
                        <button
                          type="submit"
                          disabled={
                            isAuth.cart.find(
                              (productIdInCart) => productIdInCart === item._id
                            ) || productInCart
                          }
                          onClick={
                            isAuth.cart.find(
                              (productIdInCart) => productIdInCart === item._id
                            ) || productInCart
                              ? console.log("")
                              : () => addProductToCart(item._id)
                          }
                        >
                          {isAuth.cart.find(
                            (productIdInCart) => productIdInCart === item._id
                          ) || productInCart ? (
                            <p>In cart</p>
                          ) : (
                            <p>Buy</p>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={style.favorites__empty}>
              <img
                src={manWithMagnifyingGlass}
                alt="A man with a magnifying glass"
              />

              <h2>Your favorites list is empty!</h2>
              <p>
                Add here the product that you like, so that it would be
                displayed
              </p>
            </div>
          )}{" "}
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Favorites;
