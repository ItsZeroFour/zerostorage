import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import Account from "pages/Auth/Account/Account";
import Login from "pages/Auth/Login/Login";
import Regsiter from "pages/Auth/Register/Register";
import Cart from "pages/Cart/Cart";
import Catalog from "pages/Catalog/Catalog";
import CreateProduct from "pages/CreateProduct/CreateProduct";
import Dashboard from "pages/Dashboard/Dashboard";
import Favorites from "pages/Favorites/Favorites";
import Home from "pages/Home/Home";
import NotFound from "pages/NotFound/NotFound";
import Order from "pages/Order/Order";
import ProductPage from "pages/ProductPage/ProductPage";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchGetUser, selectIsAuth } from "redux/slices/auth";
import { fetchProducts } from "redux/slices/products";
import { fetchGetReviews } from "redux/slices/reviews";

function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState({
    sortItem: "Reviews",
    value: "Reviews",
    type: "1",
  });
  const [data, setData] = useState([]);

  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchProducts([sortBy.value, sortBy.type]));
  }, [dispatch, sortBy]);

  useEffect(() => {
    dispatch(fetchGetUser());
  }, [dispatch]);

  /* SEARCH FUNCTIONALITY */
  const filterProducts = (searchText, listOfProducts) => {
    if (!searchText) {
      return listOfProducts;
    }

    return listOfProducts.filter(
      ({ title, type }) =>
        title.toLowerCase().includes(searchText.toLowerCase()) ||
        type.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredProducts = filterProducts(searchTerm, products.items);
      setData(filteredProducts);

      if (searchTerm) navigate("/catalog");
    }, 200);

    return () => clearTimeout(Debounce);
  }, [searchTerm, products]);

  return (
    <div className="App" onClick={() => setOpenMenu(false)}>
      <div className="container">
        <Header
          isAuth={isAuth}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
        <Routes>
          <Route path="/" element={<Home setSearchTerm={setSearchTerm} />} />
          <Route path="/register" element={<Regsiter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account isAuth={isAuth} />} />
          <Route
            path="/dashboard"
            element={<Dashboard isAuth={isAuth} products={products} />}
          />
          <Route
            path="/dashboard/create-product"
            element={<CreateProduct isAuth={isAuth} />}
          />
          <Route
            path="/dashboard/create-product/:id"
            element={<CreateProduct isAuth={isAuth} />}
          />
          <Route
            path="/product/:id"
            element={<ProductPage isAuth={isAuth} />}
          />
          <Route path="/cart" element={<Cart isAuth={isAuth} />} />
          <Route path="/cart/order" element={<Order isAuth={isAuth} />} />
          <Route
            path="/catalog"
            element={
              <Catalog
                data={data}
                searchTerm={searchTerm}
                setSortBy={setSortBy}
                sortBy={sortBy}
                isAuth={isAuth}
              />
            }
          />
          <Route path="/favorites" element={<Favorites isAuth={isAuth} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
