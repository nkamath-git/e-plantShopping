import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount
  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity * parseFloat(item.cost.substring(1)),
      0
    );
  };

  // Increase item quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrease item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  // Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cartItems.map((item) => (
        <div className="cart-item" key={item.name}>

          <img
            src={item.image}
            alt={item.name}
            className="cart-item-image"
          />

          <div className="cart-item-details">
            <h3>{item.name}</h3>

            <p>{item.cost}</p>

            <div>
              <button onClick={() => handleDecrement(item)}>
                -
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => handleIncrement(item)}>
                +
              </button>
            </div>

            <p>
              Total: $
              {(
                item.quantity *
                parseFloat(item.cost.substring(1))
              ).toFixed(2)}
            </p>

            <button onClick={() => handleRemove(item)}>
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;