import React from "react";
import style from "./Footer.module.scss";
import { LiaTelegramPlane } from "react-icons/lia";
import { AiOutlineGithub } from "react-icons/ai";
import { SlSocialVkontakte } from "react-icons/sl";

const Footer = () => {
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
    <footer className={style.footer}>
      <h2>ZeroStorage Company</h2>

      <ul className={style.footer__list}>
        <li>
          <a href="tel:89007005050">8 900 700-50-50</a>
        </li>

        <li>
          <a href="mailto:itsZeroFour@gmail.com">itsZeroFour@gmail.com</a>
        </li>

        <li>
          <a href="https://yandex.com/maps/-/CTWBJyQ" target="_blank">
            Moskow Lyubertsy, microdistrict Krasnaya Gorka, ave. Victory, 11,
            bldg. 2nd floor 2
          </a>
        </li>
      </ul>

      <ul className={style.footer__socials}>
        {socialItems.map(({ link, icon }) => (
          <li>
            <a href={link} target="_blank" rel="norefferer">
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
