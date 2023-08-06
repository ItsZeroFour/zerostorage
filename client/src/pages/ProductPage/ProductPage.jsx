import React, { useEffect, useState } from "react";
import style from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import Loader from "components/Loader/Loader";
import ProductPageTop from "./ProductPageTop/ProductPageTop";
import ProductPageMain from "./ProductPageMain/ProductPageMain";

const ProductPage = ({ isAuth }) => {
  const [typeOfSpecifications, setTypeOfSpecifications] =
    useState("Characteristics");
  const [data, setData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/product/getOne/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
        toast("Failed to get product");
      });
  }, [id]);

  return (
    <main className={style.productPage}>
      {data ? (
        <>
          <h2 className={style.productPage__title}>{data.title}</h2>
          <ProductPageTop
            data={data}
            isAuth={isAuth}
            id={id}
            setTypeOfSpecifications={setTypeOfSpecifications}
          />
          <ProductPageMain
            data={data}
            isAuth={isAuth}
            id={id}
            typeOfSpecifications={typeOfSpecifications}
            setTypeOfSpecifications={setTypeOfSpecifications}
          />
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default ProductPage;
