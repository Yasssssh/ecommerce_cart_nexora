import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Cartcontext } from "../context/CartContextCore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { CheckoutModal } from "../pages/CheckoutModal";

const Cart = () => {
  const { cart, totalItems, RemoveProduct, UpdateQuantity, totalPrice } =
    useContext(Cartcontext);

  const modalRef = useRef();

  const subtotal = totalPrice;

  const shipping = 5.0;
  const total = (parseFloat(subtotal) + shipping).toFixed(2);

  const OpenCheckout = () => {
    if (modalRef.current) {
      modalRef.current.openModal();
    }
  };

  if (cart.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-[#DEDED1] p-10'>
        <h2 className='text-3xl font-bold text-gray-700 mb-4'>
          Your Cart is Empty
        </h2>
        <p className='text-lg text-gray-600'>
          Time to find the perfect cutlery!
        </p>
        <Link
          to='/'
          className='mt-6 bg-[#B6AE9F] text-white py-2 px-6 rounded-lg transition duration-300 hover:bg-[#C5C7BC] font-semibold'
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#DEDED1] p-8 md:p-12'>
      <h2 className='text-4xl font-extrabold mb-8 text-gray-800 border-b-2 border-gray-300 pb-3'>
        Shopping Cart ({totalItems} Item{totalItems !== 1 ? "s" : ""})
      </h2>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* === Left Column: Cart Items List === */}
        <div className='lg:w-2/3 space-y-4'>
          {cart.map((item) => (
            <div
              key={item.name}
              className='flex items-center p-4 bg-white rounded-xl shadow-md border border-[#C5C7BC]/50'
            >
              <div className='flex-1 min-w-0 pr-4'>
                <h3 className='text-xl font-semibold truncate'>{item.name}</h3>
                <p className='text-gray-600 text-sm'>
                  Unit Price: ${item.price.toFixed(2)}
                </p>
              </div>

              <div className='flex items-center space-x-2 mx-4 flex-shrink-0'>
                <button
                  onClick={() => UpdateQuantity(item.name, "decrease")}
                  className='w-8 h-8 bg-[#C5C7BC] text-white rounded-full hover:bg-[#B6AE9F] transition duration-200'
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  -
                </button>
                <span className='w-8 text-center font-bold text-lg'>
                  {item.qty}
                </span>
                <button
                  onClick={() => UpdateQuantity(item.name, "increase")}
                  className='w-8 h-8 bg-[#C5C7BC] text-white rounded-full hover:bg-[#B6AE9F] transition duration-200'
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>

              <div className='text-right ml-4 flex-shrink-0'>
                <p className='text-xl font-bold text-gray-800'>
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <button
                  onClick={() => RemoveProduct(item.name)}
                  className='text-red-500 hover:text-red-700 mt-1'
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <FontAwesomeIcon icon={faTrashCan} className='mr-1' />
                  <span className='text-sm'>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='lg:w-1/3 sticky top-24 h-fit p-6 bg-white rounded-xl shadow-xl border border-[#B6AE9F]'>
          <h3 className='text-2xl font-bold mb-4 border-b pb-2 text-gray-800'>
            Order Summary
          </h3>

          <div className='space-y-3'>
            <div className='flex justify-between text-gray-600'>
              <span>Subtotal ({totalItems} items):</span>
              <span>${subtotal}</span>
            </div>
            <div className='flex justify-between text-gray-600'>
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className='flex justify-between pt-3 border-t-2 border-gray-200 font-extrabold text-2xl'>
              <span>Order Total:</span>
              <span className='text-[#B6AE9F]'>${total}</span>
            </div>
          </div>

          <button
            onClick={OpenCheckout}
            className='w-full mt-6 py-3 bg-[#B6AE9F] text-white text-lg font-bold rounded-lg 
                             transition duration-300 hover:bg-[#C5C7BC]'
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      <CheckoutModal ref={modalRef} total={total} />
    </div>
  );
};

export default Cart;
