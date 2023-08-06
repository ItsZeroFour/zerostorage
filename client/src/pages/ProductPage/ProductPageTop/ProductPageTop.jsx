import React, { useEffect, useState } from "react";
import style from "../ProductPage.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { fetchGetUser } from "redux/slices/auth";
import { BiSolidPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import Slider from "./Slider/Slider";

const ProductPageTop = ({ data, isAuth, id, setTypeOfSpecifications }) => {
  const [productInCart, setProductInCart] = useState(true);
  const [productAlreadyInFavorites, setProductAlreadyInFavorites] =
    useState(false);

  const dispatch = useDispatch();

  const addProductToCart = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.put(`/product/addToCart/${id}`);

      dispatch(fetchGetUser());
      setProductInCart(true);

      if (data.success) toast("Product add successfully");
    } catch (err) {
      console.log(err);
      toast("Failed to add product to cart");
    }
  };

  useEffect(() => {
    if (isAuth && id)
      setProductAlreadyInFavorites(isAuth.favorites.indexOf(id) !== -1);
  }, [isAuth, id]);

  const addProductToFavorites = async (event) => {
    event.preventDefault();

    if (!isAuth) return;

    if (!productAlreadyInFavorites) {
      await axios.put(`/product/addToFavorites/${id}`);
      dispatch(fetchGetUser());
      toast("Product added to favorites successfully!");
    } else {
      await axios.put(`/product/removeFromFavorites/${id}`);
      dispatch(fetchGetUser());
      toast("product removed from favorites successfully!");
    }
  };

  useEffect(() => {
    isAuth &&
      setProductInCart(
        isAuth.cart.find((idInCart) => idInCart === id) ? true : false
      );
  }, [isAuth, id]);

  return (
    <section className={style.productPage__top__info}>
      <Slider data={data} />

      <div className={style.productPage__top__info__right}>
        <p>
          {data.about.length > 150
            ? `${data.about.substring(0, 150)} ...`
            : data.about}
        </p>

        <div className={style.productPage__reviews}>
          <a
            href="#product-page-main"
            onClick={() => setTypeOfSpecifications("Reviews")}
          >
            <p>{data.reviews.length} reviews</p>
          </a>
        </div>

        <h4>{data.type}</h4>

        <div className={style.productPage__price}>
          <h3>{data.amount}$</h3>{" "}
          {isAuth && (
            <div className={style.productPage__price__buttons}>
              {isAuth && isAuth.role.toLowerCase() === "admin" && (
                <Link
                  className={style.productPage__prict__button__change}
                  to={`/dashboard/create-product/${data._id}`}
                >
                  <BiSolidPencil />
                </Link>
              )}

              {!productInCart ? (
                <button
                  className={style.productPage__price__buttons__cart}
                  onClick={addProductToCart}
                >
                  Add to cart
                </button>
              ) : (
                <button
                  className={style.productPage__price__buttons__cart}
                  disabled
                >
                  Product in cart
                </button>
              )}

              <button
                className={style.productPage__price__buttons__heart}
                onClick={addProductToFavorites}
              >
                {productAlreadyInFavorites ? (
                  <AiFillHeart />
                ) : (
                  <AiOutlineHeart />
                )}
              </button>
            </div>
          )}
        </div>

        <a
          className={style.productPage__top__info__right__link}
          href="#product-page-main"
        >
          Go to specifications
        </a>
      </div>
    </section>
  );
};

export default ProductPageTop;
