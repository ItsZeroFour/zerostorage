import React, { useEffect } from "react";
import style from "./Dashboard.module.scss";
import Loader from "components/Loader/Loader";
import { Link, Navigate } from "react-router-dom";

const Dashboard = ({ isAuth, products }) => {
  useEffect(() => {
    if (isAuth) {
      if (isAuth.role.toLowerCase() === "user") return <Navigate to="/" />;
    }
  }, [isAuth]);

  return (
    <main className={style.dashboard}>
      {isAuth && products.items ? (
        <React.Fragment>
          <section className={style.dashboard__top}>
            <div className={style.dashboard__top__block}>
              <h3>All time sales</h3>

              <h2>1.343.232$</h2>
            </div>

            <div className={style.dashboard__top__block}>
              <h3>Total products</h3>

              <h2>{products.items.length}</h2>
            </div>

            <Link to="/dashboard/create-product">Create product</Link>
          </section>
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Dashboard;
