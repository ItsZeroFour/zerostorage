import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import style from "../../ProductPage.module.scss";

const Slider = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const length = data.images.length;

  const prevSlide = () => {
    setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
  };

  if (!Array.isArray(data.images) || data.images <= 0) {
    return null;
  }

  return (
    <section className={style.slider}>
      <AiOutlineArrowLeft
        className={style.slider__arrow__left}
        onClick={prevSlide}
      />
      <AiOutlineArrowRight
        className={style.slider__arrow__right}
        onClick={nextSlide}
      />
      {data.images.map((item, index) => (
        <div
          key={item}
          className={index === currentSlide ? style.slide__active : style.slide}
        >
          {index === currentSlide && (
            <img
              src={process.env.REACT_APP_API_URL + item}
              alt="product"
            />
          )}
        </div>
      ))}
    </section>
  );
};

export default Slider;
