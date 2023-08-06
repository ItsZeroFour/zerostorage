import React from "react";
import style from "../ProductPage.module.scss";
import { BsFillStarFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import Reviews from "./Reviews/Reviews";

const ProductPageMain = ({
  data,
  id,
  isAuth,
  setTypeOfSpecifications,
  typeOfSpecifications,
}) => {
  return (
    <section className={style.productPage__main__info} id="product-page-main">
      <div className={style.productPage__main__left}>
        <div className={style.productPage__main__product}>
          <div>
            <p>{data.title}</p>
            <img
              src={process.env.REACT_APP_API_URL + data.images[0]}
              alt="product"
            />
          </div>

          <div>
            <h4>{data.amount} $</h4>
            <button>Add to cart</button>
          </div>
        </div>

        <ul className={style.productPage__main__list}>
          {[
            { icon: <FaThList />, title: "Characteristics" },
            { icon: <BsFillStarFill />, title: "Reviews" },
          ].map(({ icon, title }) => (
            <li
              key={title}
              onClick={() => setTypeOfSpecifications(title)}
              className={
                typeOfSpecifications === title
                  ? style.productPage__main__active
                  : ""
              }
            >
              {icon} <p>{title}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={style.productPage__main}>
        {typeOfSpecifications.toLowerCase() === "characteristics" ? (
          <>
            <ul className={style.productPage__main__right}>
              {data.characteristics.map(({ item, value }) => (
                <li key={item}>
                  <p className={style.productPage__main__right__item}>{item}</p>
                  <p className={style.productPage__main__right__value}>
                    {value}
                  </p>
                </li>
              ))}
            </ul>

            <div className={style.productPage__main__about}>
              <p>{data.about}</p>
            </div>
          </>
        ) : (
          <Reviews id={id} isAuth={isAuth} productTitle={data.title} />
        )}
      </div>
    </section>
  );
};

export default ProductPageMain;
