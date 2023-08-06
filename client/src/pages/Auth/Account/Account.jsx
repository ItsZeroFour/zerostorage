import React from "react";
import style from "./Account.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "redux/slices/auth";

const Account = ({ isAuth }) => {
  const userData = isAuth;
  const dispatch = useDispatch();

  const logOut = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <main className={style.account}>
      {userData && (
        <>
          <div className={style.account__top}>
            <FontAwesomeIcon icon={faUser} />

            <div className={style.account__top__main}>
              <h2>
                {userData.firstName} {userData.lastName}
              </h2>
            </div>
          </div>

          <ul className={style.account__main__info}>
            {[
              { item: userData.firstName, text: "First name" },
              { item: userData.lastName, text: "Last name" },
              { item: userData.phoneNumber, text: "Phone number" },
              { item: userData.email, text: "Email" },
            ].map(({ item, text }) => (
              <li key={text}>
                <p>{text}</p>
                <h5>{item}</h5>
              </li>
            ))}
          </ul>

          <button className={style.account__logout} onClick={logOut}>
            Log out <FiLogOut />
          </button>

          {userData.role.toLowerCase() === "admin" && (
            <Link className={style.account__dashboard__link} to="/dashboard">
              Go to Dashboard <BsFillGrid1X2Fill />
            </Link>
          )}

          <div className={style.account__createdAt}>
            Created at <h5>{userData.createdAt}</h5>
          </div>
        </>
      )}
    </main>
  );
};

export default Account;
