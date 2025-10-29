import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import toast from "react-hot-toast";

const ProductGrid = () => {
  const [productsstate, setproducts] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products/");

        const serverData = response.data;

        if (!serverData.success) {
          return toast.error("Unable to fetch products from server.");
        } else {
          setproducts(serverData.products);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchAll();
  }, []);

  if (productsstate.length === 0) {
    return (
      <p className='text-center text-xl text-gray-500 my-10'>
        Loading products...
      </p>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 my-8'>
      {productsstate.map((product) => {
        return (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            rating={product.rating}
            description={product.description}
            image={product.image}
            id={product.id}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
