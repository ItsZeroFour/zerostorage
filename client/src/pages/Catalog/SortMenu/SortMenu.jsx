import React, { useEffect, useState } from "react";
import style from "./SortMenu.module.scss";
import { useDispatch } from "react-redux";
import { fetchProducts } from "redux/slices/products";
import { FaList } from "react-icons/fa";
import { BsFillGrid3X2GapFill } from "react-icons/bs";

const SortMenu = ({
  setSortBy,
  sortBy,
  setTypeOfGroupItems,
  typeOfGroupItems,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openGroupMenu, setOpenGroupMenu] = useState(false);
  const dispatch = useDispatch();

  const sortList = [
    { sortItem: "Reviews", value: "reviews", type: "-1" },
    { sortItem: "High Price", value: "amount", type: "-1" },
    { sortItem: "Low Price", value: "amount", type: "1" },
    { sortItem: "From A to Z", value: "title", type: "1" },
  ];

  const typesOfGroup = [
    { type: "Details", icon: <FaList /> },
    { type: "Blocks", icon: <BsFillGrid3X2GapFill /> },
  ];

  useEffect(() => {
    dispatch(fetchProducts([sortBy.value, sortBy.type]));
  }, [sortBy, dispatch]);

  const currentTypeOfGroup = {
    ...typesOfGroup.filter(({ type }) => type === typeOfGroupItems),
  };

  return (
    <section className={style.sortmenu}>
      <div className={style.sortmenu__sort__by}>
        <ul className={style.sortmenu__list}>
          <li className={style.sortmenu__sort}>
            Sort by:{" "}
            <button
              onClick={() => {
                setOpenMenu(!openMenu);
                setOpenGroupMenu(false);
              }}
            >
              {sortBy.sortItem}
            </button>
          </li>

          <li className={style.sortmenu__group}>
            Group type:
            <button
              onClick={() => {
                setOpenGroupMenu(!openGroupMenu);
                setOpenMenu(false);
              }}
            >
              {currentTypeOfGroup[0].type}
            </button>
          </li>
        </ul>

        {openMenu && (
          <ul className={style.sortmenu__sort__list}>
            {sortList.map((item) => (
              <li
                onClick={() => {
                  setSortBy(item);
                  setOpenMenu(false);
                }}
              >
                {item.sortItem}
              </li>
            ))}
          </ul>
        )}

        {openGroupMenu && (
          <ul className={style.sortmenu__group__list}>
            {typesOfGroup.map((item) => (
              <li
                onClick={() => {
                  setTypeOfGroupItems(item.type);
                  setOpenGroupMenu(false);
                }}
              >
                {item.icon} <p>{item.type}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SortMenu;
