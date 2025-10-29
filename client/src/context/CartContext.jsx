import { useState, useEffect } from "react";
import { Cartcontext } from "./CartContextCore";
import axios from "axios";

const API_URL = "http://localhost:3000/api/cart";

export const CartcontextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchInitialCart = async () => {
      try {
        const res = await axios.get(`${API_URL}/getcart`);
        if (res.data.success) {
          setCart(res.data.cart);
          setTotalPrice(res.data.total);
        }
      } catch (error) {
        console.error("Failed to fetch cart on load:", error);
      }
    };

    fetchInitialCart();
  }, []);

  const AddProduct = async (productname, productprice) => {
    try {
      const res = await axios.post(`${API_URL}/addtocart`, {
        name: productname,
        price: productprice,
      });

      if (res.data.success) {
        setCart(res.data.cart);
        setTotalPrice(res.data.total);
      } else {
        console.error("failed to add product", res.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const RemoveProduct = async (productName) => {
    try {
      const res = await axios.delete(
        `${API_URL}/removefromcart/${productName}`
      );

      if (res.data.success) {
        setCart(res.data.cart);
        setTotalPrice(res.data.total);
      } else {
        console.error("failed to remove product", res.data.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const UpdateQuantity = async (productName, action) => {
    try {
      const res = await axios.put(`${API_URL}/updatequantity`, {
        name: productName,
        action: action,
      });

      if (res.data.success) {
        setCart(res.data.cart);
        setTotalPrice(res.data.total);
      } else {
        console.error("Failed to update quantity:", res.data.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const ClearCart = async () => {
    try {
      const res = await axios.delete(`${API_URL}/clearcart`);

      if (res.data.success) {
        setCart(res.data.cart);
        setTotalPrice(res.data.total);
      } else {
        console.error("Failed to clear cart:", res.data.message);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const CheckOut = async (details) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/checkout",
        details
      );

      if (res.data.success) {
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      console.log(error.message);
      return { success: false, message: error.message };
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const value = {
    cart,
    AddProduct,
    RemoveProduct,
    UpdateQuantity,
    ClearCart,
    setCart,
    totalItems,
    totalPrice,
    CheckOut,
  };

  return <Cartcontext.Provider value={value}>{children}</Cartcontext.Provider>;
};
