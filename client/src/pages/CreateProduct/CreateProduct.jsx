import React, { useEffect, useState } from "react";
import style from "./CreateProduct.module.scss";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRemoveProducts } from "redux/slices/products";

const CreateProduct = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [characteristics, setCharacteristics] = useState([]);
  const [characteristicsItem, setCharacteristicsItem] = useState("");
  const [characteristicsValue, setCharacteristicsValue] = useState("");
  const [images, setImages] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEditing = Boolean(id);

  /*
    Get file and send it to the server
    If we get an error send notification
  */
  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post("/upload", formData);

      images.push(data.url);
    } catch (err) {
      console.log(err);
      toast("Failed to upload image");
    }
  };

  const addCharacteristic = (event) => {
    event.preventDefault();

    characteristics.push({
      item: characteristicsItem,
      value: characteristicsValue,
    });

    setCharacteristicsItem("");
    setCharacteristicsValue("");
  };

  const createProductOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const fields = {
        title,
        about,
        type,
        amount,
        images,
        characteristics,
      };

      console.log(images);

      !isEditing
        ? await axios.post("/product/create", fields)
        : await axios.patch(`/product/update/${id}`, fields);

      // const id = !isEditing && data._id;
      // isEditing ? navigate("/") : navigate(`/product/${id}`);

      toast("Product created successfully");
    } catch (err) {
      console.log(err);
      toast("Failed to create product");
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/product/getOne/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setAbout(data.about);
          setType(data.type);
          setAmount(data.amount);
          setCharacteristics(data.characteristics);
          setImages(data.images);
        })
        .catch((err) => {
          console.log(err);
          toast("Failed to get product");
        });
    }
  }, [id]);

  const removeProduct = () => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      dispatch(fetchRemoveProducts(id));
      toast("Product removed successfully!");
    }
  };

  if (!isAuth || isAuth.role.toLowerCase() !== "admin") return navigate("/");

  return (
    <main className={style.createProduct}>
      <div className={style.createProduct__container}>
        <section className={style.createProduct__main}>
          <form className={style.createProduct__form}>
            <input
              type="text"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              placeholder="Title"
            />
            <textarea
              onChange={(event) => setAbout(event.target.value)}
              value={about}
              placeholder="About product"
            />
            <input
              type="text"
              onChange={(event) => setType(event.target.value)}
              value={type}
              placeholder="Type"
            />
            <input
              type="number"
              onChange={(event) => setAmount(event.target.value)}
              value={amount}
              placeholder="Amount"
            />

            <div className={style.createProduct__сharacteristics}>
              <input
                type="text"
                onChange={(event) => setCharacteristicsItem(event.target.value)}
                value={characteristicsItem}
                placeholder="Characteristics item"
              />
              <input
                type="text"
                onChange={(event) =>
                  setCharacteristicsValue(event.target.value)
                }
                value={characteristicsValue}
                placeholder="Characteristics item value"
              />

              <button onClick={addCharacteristic}>Add item</button>
            </div>
          </form>
        </section>

        <section className={style.createProduct__view}>
          <ul>
            {images.map((item, index) => (
              <li key={index}>{item.url}</li>
            ))}
          </ul>
          <h2>{title}</h2>
          <p>{about}</p>
          <h4>{type}</h4>
          <h3>{amount}</h3>

          {characteristics.map(({ item, value }) => (
            <p key={item}>
              {item}: {value}
            </p>
          ))}
        </section>

        <section className={style.createProduct__images}>
          <form>
            <input
              type="file"
              id="create-product-image"
              onChange={handleChangeFile}
              hidden
              accept=".jpg, .png, .jpeg"
            />
            <label htmlFor="create-product-image">Add image</label>
          </form>
        </section>
      </div>

      <button
        className={style.createProduct__create__button}
        onClick={createProductOnSubmit}
        type="submit"
      >
        Create product
      </button>

      {isEditing && (
        <button className={style.createProduct__delete} onClick={removeProduct}>
          Delete product
        </button>
      )}
    </main>
  );
};

export default CreateProduct;
