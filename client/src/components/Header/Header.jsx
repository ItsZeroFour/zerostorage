import React from "react";
import style from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faClose,
  faHeart,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { SlSocialVkontakte } from "react-icons/sl";
import { LiaTelegramPlane } from "react-icons/lia";
import { AiOutlineGithub } from "react-icons/ai";

const Header = ({
  isAuth,
  searchTerm,
  setSearchTerm,
  openMenu,
  setOpenMenu,
}) => {
  const socialItems = [
    {
      item: "VK",
      link: "https://vk.com/nullbebra",
      icon: <SlSocialVkontakte />,
    },
    {
      item: "Telegram",
      link: "https://t.me/ItsZeroFour",
      icon: <LiaTelegramPlane />,
    },
    {
      item: "Github",
      link: "https://github.com/ItsZeroFour",
      icon: <AiOutlineGithub />,
    },
  ];

  return (
    <header
      className={style.header}
      onClick={(event) => event.stopPropagation()}
    >
      <NavLink to="/" className={style.header__logo}>
        <h2>ZeroStorage</h2>
        <p>The largest hypermarket in the world</p>
      </NavLink>

      <form className={style.header__form}>
        <input
          type="text"
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
          placeholder="Enter the name of the item you want..."
        />
        {searchTerm === "" ? (
          <FontAwesomeIcon icon={faSearch} />
        ) : (
          <FontAwesomeIcon
            className={style.header__clear__input__button}
            onClick={() => setSearchTerm("")}
            icon={faClose}
          />
        )}
      </form>

      {isAuth ? (
        <ul className={style.header__list}>
          <li className={style.header__item}>
            <Link to="/favorites">
              <span>{isAuth.favorites.length}</span>
              <FontAwesomeIcon icon={faHeart} />
            </Link>
          </li>

          <li className={style.header__item}>
            <Link to="/cart">
              <span>{isAuth.cart.length}</span>
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </li>

          <div className={style.header__user}>
            <div
              className={style.header__account}
              onClick={() => setOpenMenu(!openMenu)}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
        </ul>
      ) : (
        <Link className={style.header__link} to="/login">
          Login
        </Link>
      )}

      {openMenu && (
        <div className={style.openMenu}>
          <ul className={style.openMenu__list}>
            <li>
              <Link to="/account" onClick={() => setOpenMenu(false)}>
                <CiUser /> Account
              </Link>
            </li>

            <li>
              <Link to="/cart" onClick={() => setOpenMenu(false)}>
                <CiShoppingCart /> Cart
              </Link>
            </li>

            <li>
              <Link to="/favorites" onClick={() => setOpenMenu(false)}>
                <GoHeart /> Favorites
              </Link>
            </li>
          </ul>

          <ul className={style.openMenu__social}>
            {socialItems.map(({ link, icon }) => (
              <li>
                <a href={link} target="_blank" rel="norefferer">
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
