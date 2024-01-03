import React, { useState } from "react";
export default function CartList(props) {
  const [quantity, setquantity] = useState(1);
  const handleAddQuantity = () => {
    setquantity(quantity + 1);
  };
  const handleMinusQuantity = () => {
    if (quantity != 1) {
      setquantity(quantity - 1);
    }
  };
  return (
    <div className="cart-item">
      <h1>Item name: {props.name}</h1>
      <h2>Price: {props.price}</h2>
      <h2>Quantity: {quantity}</h2>
      <button
        className="delete-button"
        onClick={() => {
          props.Ondelete(props.index);
        }}
      >
        x
      </button>
      <div className="quantity-actions">
        <button className="add-quantity" onClick={handleAddQuantity}>
          +
        </button>
        <button className="subtract-quantity" onClick={handleMinusQuantity}>
          -
        </button>
      </div>
    </div>
  );
}
