import { useState, useImperativeHandle, forwardRef } from "react";
import { useContext } from "react";
import { Cartcontext } from "../context/CartContextCore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export const CheckoutModal = forwardRef(({ total }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ClearCart, CheckOut, cart, totalPrice } = useContext(Cartcontext);

  useImperativeHandle(ref, () => ({
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const details = {
      name: form.name.value,
      email: form.email.value,
      address: form.address.value,
      cart: cart,
      total: totalPrice,
    };

    const result = await CheckOut(details);

    if (result.success) {
      toast.success("checkout completed!");
      ClearCart();
      setIsOpen(false);
    } else {
      toast.error(`Checkout failed: ${result.message || "Please try again."}`);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300'
      onClick={() => setIsOpen(false)}
    >
      {/* Modal Content */}
      <div
        className='bg-white rounded-xl shadow-2xl p-8 w-11/12 max-w-lg relative transform transition-transform duration-300 scale-100'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition'
          aria-label='Close Checkout'
        >
          <FontAwesomeIcon icon={faTimes} size='xl' />
        </button>

        <h3 className='text-3xl font-extrabold mb-6 text-gray-800 border-b pb-3'>
          Finalize Your Order
        </h3>

        {/* Order Total Review */}
        <div className='mb-6 p-4 bg-[#DEDED1] rounded-lg'>
          <div className='flex justify-between font-extrabold text-xl text-gray-800'>
            <span>Order Total:</span>
            <span className='text-[#B6AE9F]'>${total}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit}>
          <h4 className='text-xl font-semibold mb-4 text-gray-700'>
            Shipping Information
          </h4>

          <div className='space-y-4'>
            <input
              type='text'
              name='name'
              placeholder='Full Name'
              required
              className='w-full p-3 border border-[#C5C7BC] rounded-lg focus:ring-2 focus:ring-[#B6AE9F] focus:border-transparent transition'
            />
            <input
              type='email'
              name='email'
              placeholder='Email Address'
              required
              className='w-full p-3 border border-[#C5C7BC] rounded-lg focus:ring-2 focus:ring-[#B6AE9F] focus:border-transparent transition'
            />
            <textarea
              placeholder='Shipping Address'
              required
              name='address'
              rows='3'
              className='w-full p-3 border border-[#C5C7BC] rounded-lg focus:ring-2 focus:ring-[#B6AE9F] focus:border-transparent transition'
            ></textarea>
          </div>

          <button
            type='submit'
            className='w-full mt-6 py-3 bg-[#B6AE9F] text-white text-lg font-bold rounded-lg 
                       transition duration-300 hover:bg-[#C5C7BC]'
          >
            Pay Now (${total})
          </button>
        </form>
      </div>
    </div>
  );
});

CheckoutModal.displayName = "CheckoutModal";
