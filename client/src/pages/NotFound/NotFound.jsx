import React from "react";
import style from "./NotFound.module.scss";
import Image404 from "../../images/NotFound/404.png";

const NotFound = () => {
  return (
    <main className={style.notFound}>
      <img src={Image404} alt="404 cart" />

      <div className={style.notFound__text}>
        <h1>Oops!</h1>
        <p>
          This page has been robbed and hacked! In the meantime, I'm restoring
          it, you can see other products
        </p>
      </div>
    </main>
  );
};

export default NotFound;
