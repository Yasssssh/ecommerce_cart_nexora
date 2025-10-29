import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { Cartcontext } from "../context/CartContextCore";
import logo from "../assets/logo2.jpg";

const renderStars = (rating) => {
  const maxstars = 5;

  const numericrating = Math.max(
    0,
    Math.min(maxstars, parseInt(rating.split("/")[0]))
  );

  const stars = [];

  for (let i = 1; i <= maxstars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={i <= numericrating ? "text-yellow-500" : "text-gray-400"}
      />
    );
  }

  return stars;
};

const ProductCard = ({ name, price, rating, description, image, id }) => {
  const { AddProduct } = useContext(Cartcontext);

  return (
    <div className='bg-[#DEDED1] h-auto rounded-xl flex flex-col text-center align-center justify-evenly py-4'>
      <img
        className='h-40 mx-4 rounded-lg object-contain'
        src={image || logo}
      />
      <div className='flex flex-row text-center justify-between mx-4 mt-4 mb-6'>
        <h3 className='text-xl font-semibold'>{name || "Product"}</h3>
        <p className='text-xl'>${price || "$15"}</p>
      </div>
      <p className='text-left mx-4 text-gray-600 mb-6'>
        {description ||
          "Made from durable, rust-resistant 18/10 stainless steel, ensuring a lustrous, mirror-polished finish that remains brilliant even after years of use."}
      </p>
      <div className='flex flex-row text-left mx-4 mb-6 items-center'>
        {renderStars(rating || "4/5")}
      </div>
      <button
        onClick={() => AddProduct(name, price, id)}
        className='bg-[#C5C7BC] h-10 mx-8 rounded-lg transition duration-300 ease-in-out hover:bg-[#B6AE9F] hover:text-white'
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
