import React, { useCallback, useEffect, useState } from "react";
import style from "./Reviews.module.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../utils/axios";
import { fetchCreateReview, fetchGetReviews } from "redux/slices/reviews";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { fetchGetUser } from "redux/slices/auth";
import ReactPaginate from "react-paginate";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";

const Reviews = ({ id, isAuth, productTitle }) => {
  const [dignity, setDignity] = useState("");
  const [unworthiness, setUnworthiness] = useState("");
  const [images, setImages] = useState([]);
  const [userReviewIsExists, setUserReviewIsExists] = useState(false);
  const [userOrderedProduct, setUserOrderedProduct] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const { reviews } = useSelector((state) => state.reviews);

  const reviewsPerPage = 10;
  const pageCount = reviews && Math.ceil(reviews.length / reviewsPerPage);
  const pageVisited = pageNumber * reviewsPerPage;

  const dispatch = useDispatch();

  /* GET REVIEWS */
  const fetchReviews = useCallback(async () => {
    try {
      dispatch(fetchGetReviews(id));
    } catch (err) {
      console.log(err);
    }
  }, [id, dispatch]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    reviews &&
      isAuth &&
      reviews.map(({ author }) => {
        if (isAuth._id === author._id) {
          setUserReviewIsExists(true);
        }
      });

    if (!isAuth) setUserReviewIsExists(true);
  }, [isAuth, reviews]);

  useEffect(() => {
    id &&
      isAuth &&
      isAuth.orders.length !== 0 &&
      isAuth.orders.flat().map((item) => {
        if (id === item) {
          return setUserOrderedProduct(true);
        }
      });
  }, []);

  /* UPLOAD IMAGES FUNCTIONS */
  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post("/upload", formData);

      const copy = Object.assign([], images);
      copy.push(data.url);

      if (images.length === 3) return;

      setImages(copy);
    } catch (err) {
      console.log(err);
      toast("Failerd dile upload");
    }
  };

  /* CREATE REVIEW FUNCTION */
  const createReview = (event) => {
    event.preventDefault();

    try {
      dispatch(
        fetchCreateReview({ productId: id, dignity, unworthiness, images })
      );
      fetchReviews();
      fetchGetUser();

      setDignity("");
      setImages([]);
      setUnworthiness("");

      toast("Review created successfully");
    } catch (err) {
      console.log(err);
    }
  };

  /* PAGINATION FUNC */
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <section className={style.reviews}>
      <h2 className={style.reviews__title}>{productTitle} reviews</h2>
      {isAuth && !userReviewIsExists && userOrderedProduct && (
        <form className={style.reviews__form}>
          <textarea
            type="text"
            onChange={(event) => setDignity(event.target.value)}
            value={dignity}
            placeholder="Dignity"
          />
          <textarea
            type="text"
            onChange={(event) => setUnworthiness(event.target.value)}
            value={unworthiness}
            placeholder="Unworthiness"
          />

          <input
            type="file"
            id="reviews-file"
            onChange={handleChangeFile}
            hidden
            accept=".png, .jpg, .jpeg"
          />
          <label htmlFor="reviews-file">Upload image</label>

          <ul className={style.reviews__images}>
            {images.map((imageUrl, index) => (
              <li key={index}>
                <FontAwesomeIcon
                  onClick={() => {
                    const newArr = images.filter(
                      (imgurl) => imgurl !== imageUrl
                    );
                    console.log(newArr);
                    setImages(newArr);
                  }}
                  icon={faClose}
                />
                <img
                  src={process.env.REACT_APP_API_URL + imageUrl}
                  alt="user product"
                />
              </li>
            ))}
          </ul>

          <button
            type="submit"
            onClick={createReview}
            disabled={dignity === "" || unworthiness === ""}
          >
            Submit
          </button>
        </form>
      )}

      {reviews && reviews.filter((element) => element != null).length !== 0 ? (
        <>
          <ul className={style.reviews__list}>
            {reviews
              .filter((element) => element != null)
              .reverse()
              .slice(pageVisited, pageVisited + reviewsPerPage)
              .map((item) => (
                <li>
                  <div className={style.reviews__author}>
                    <h3>
                      {item.author.firstName} {item.author.lastName}
                    </h3>
                  </div>

                  <div className={style.reviews__dignity}>
                    <h4>Dignity</h4>
                    <p>{item.dignity}</p>
                  </div>

                  <div className={style.reviews__unworthiness}>
                    <h4>Unworthiness</h4>
                    <p>{item.unworthiness}</p>
                  </div>

                  {item.images.length !== 0 && (
                    <ul className={style.reviews__images}>
                      {item.images.map((imageUrl, index) => (
                        <li key={index}>
                          <img
                            src={process.env.REACT_APP_API_URL + imageUrl}
                            alt="user product"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>

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
        </>
      ) : (
        <h4 className={style.reviews__text}>
          Unfortunately, this product doensn't have reviews
        </h4>
      )}
    </section>
  );
};

export default Reviews;

