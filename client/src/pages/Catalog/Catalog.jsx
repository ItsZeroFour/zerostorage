import React, { useEffect, useState } from "react";
import style from "./Catalog.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import manWithMagnifyingGlass from "../../images/Catalog/manwithmagnifyingglass.svg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchGetUser } from "redux/slices/auth";
import axios from "../../utils/axios";
import SortMenu from "./SortMenu/SortMenu";
import ReactPaginate from "react-paginate";
import { RiArrowRightDoubleFill, RiArrowLeftDoubleFill } from "react-icons/ri";

const Catalog = ({ data, searchTerm, setSortBy, sortBy, isAuth }) => {
  const [productInCart, setProductInCart] = useState(false);
  const [productAlreadyInFavorites, setProductAlreadyInFavorites] =
    useState(false);
  const [typeOfGroupItems, setTypeOfGroupItems] = useState(() => {
    const getSavedValue = localStorage.getItem("typeOfGroupItems");
    return getSavedValue || "Details";
  });

  const [pageNumber, setPageNumber] = useState(0);
  const catalogPerPage = 21;
  const pageCount = Math.ceil(data.length / catalogPerPage);

  const pageVisited = pageNumber * catalogPerPage;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchTerm) navigate("/");
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("typeOfGroupItems", typeOfGroupItems);
  }, [typeOfGroupItems]);

  const addProductToCart = async (_id) => {
    try {
      const { data } = await axios.put(`/product/addToCart/${_id}`);

      dispatch(fetchGetUser());
      setProductInCart(true);

      if (data.success) toast("Product add successfully");
    } catch (err) {
      console.log(err);
      toast("Failed to add product to cart");
    }
  };

  const addProductToFavorites = async (id) => {
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

  /* PAGINATION FUNC */
  const handlePageChange = ({selected}) => {
    setPageNumber(selected);
  };

  return (
    <main className={style.catalog}>
      <SortMenu
        setSortBy={setSortBy}
        sortBy={sortBy}
        setTypeOfGroupItems={setTypeOfGroupItems}
        typeOfGroupItems={typeOfGroupItems}
      />

      {data.length !== 0 ? (
        <ul
          className={
            typeOfGroupItems === "Details"
              ? style.catalog__list
              : style.caralog__group
          }
        >
          {data.slice(pageVisited, pageVisited + catalogPerPage).map((item) => (
            <li className={style.catalog__item} key={item._id}>
              <Link
                className={style.catalog__item__main}
                to={`/product/${item._id}`}
              >
                <img
                  src={process.env.REACT_APP_API_URL + item.images[0]}
                  alt={item.title}
                />

                <div className={style.catalog__item__text}>
                  <h5>{item.title}</h5>

                  {typeOfGroupItems === "Details" &&
                    window.screen.width > 580 && (
                      <div className={style.catalog__reviews}>
                        <p>{item.reviews.length} reviews</p>
                      </div>
                    )}
                </div>
              </Link>

              {typeOfGroupItems === "Details" && window.screen.width < 580 && (
                <div className={style.catalog__reviews}>
                  <p>{item.reviews.length} reviews</p>
                </div>
              )}

              <div className={style.catalog__other}>
                <h2>{new Intl.NumberFormat("en").format(item.amount)}$</h2>

                {isAuth && isAuth.cart && (
                  <div className={style.catalog__buttons}>
                    <button
                      type="submit"
                      className={
                        productAlreadyInFavorites ||
                        isAuth.favorites.indexOf(item._id) !== -1
                          ? style.catalog__infavorites
                          : style.catalog__favorites
                      }
                      onClick={() => addProductToFavorites(item._id)}
                    >
                      <AiOutlineHeart />
                    </button>
                    <button
                      type="submit"
                      onClick={
                        isAuth.cart.find(
                          (productIdInCart) => productIdInCart === item._id
                        ) || productInCart
                          ? console.log("")
                          : () => addProductToCart(item._id)
                      }
                    >
                      {isAuth.cart.find(
                        (productIdInCart) => productIdInCart === item._id
                      ) || productInCart ? (
                        <p>In cart</p>
                      ) : (
                        <p>Buy</p>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={style.catalog__not__found}>
          <img
            src={manWithMagnifyingGlass}
            alt="A man with a magnifying glass"
          />

          <h2>This item was not found!</h2>
          <p>Please try changing the product name or try again later.</p>
        </div>
      )}

      <ReactPaginate
        previousLabel={<RiArrowLeftDoubleFill />}
        nextLabel={<RiArrowRightDoubleFill />}
        breakLabel={"..."}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        pageClassName={"pagination__page"}
        pageLinkClassName={"pagination__link"}
        previousClassName={"pagination__previous"}
        nextClassName={"pagination__next"}
        activeClassName={"pagination__active"}
      />
    </main>
  );
};

export default Catalog;
