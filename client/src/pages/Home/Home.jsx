import React from "react";
import style from "./Home.module.scss";
import homeImage from "../../images/Home/graphic-card.png";
import { SiNvidia } from "react-icons/si";
import { GiProcessor } from "react-icons/gi";
import { CgSmartphoneRam } from "react-icons/cg";
import { AiOutlinePoweroff } from "react-icons/ai";
import { IoIosLaptop } from "react-icons/io";
import { CiMonitor } from "react-icons/ci";

const Home = ({ setSearchTerm }) => {
  const menuItems = [
    { item: "Graphic card", icon: <SiNvidia /> },
    { item: "Processor", icon: <GiProcessor /> },
    { item: "RAM", icon: <CgSmartphoneRam /> },
    { item: "Power unit", icon: <AiOutlinePoweroff /> },
    { item: "Laptop", icon: <IoIosLaptop /> },
    { item: "Monitor", icon: <CiMonitor /> },
  ];

  return (
    <main className={style.home}>
      <h1 className={style.home__title}>Welcome to the ZeroStorage!</h1>

      <section className={style.home__section}>
        <ul className={style.home__list}>
          {menuItems.map(({ item, icon }) => (
            <li
              className={style.home__item}
              onClick={() => setSearchTerm(item)}
            >
              {icon}
              <h4>{item}</h4>
            </li>
          ))}
        </ul>
      </section>

      <section className={style.home__section}>
        <div className={style.home__banner}>
          <div className={style.home__text}>
            <h2>Technology for every day</h2>
            <h1>Everything you need in one place!</h1>
            <p>
              The biggest hypermarket in the world! We work all over the world.
              The lowest prices and the fastest delivery!
            </p>
          </div>

          <div className={style.home__image}>
            <img src={homeImage} alt="graphic card" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
