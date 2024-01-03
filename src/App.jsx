import { useState } from "react";
import "./App.css";
import products from "./data/products";
import CartList from "./data/components/CartList";
function App() {
  const [carts, setCarts] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const handleAddCart = (index) => {
    const newCarts = [...carts];
    if (
      !newCarts.length ||
      !newCarts.some((item) => item.id === products[index].id)
    ) {
      newCarts.push({ ...products[index], quantity: 1 });
    } else if (newCarts.some((item) => item.id === products[index].id)) {
      newCarts.filter((item) => {
        if (products[index].id === item.id) {
          item.quantity += 1;
        }
      });
    }
    settotalPrice(products[index].price + totalPrice);
    setCarts(newCarts);
  };
  const handleDeleteCart = (cartIndex) => {
    const NewCart = [...carts];
    NewCart.splice(cartIndex, 1);
    setCarts(NewCart);
  };
  const handleAddQuantity = (index) => {
    const newQuantity = [...carts];
    newQuantity[index].quantity += 1;
    setCarts(newQuantity);
    settotalPrice(totalPrice + products[index].price);
  };
  const handleMinusQuantity = (index) => {
    const newQuantity = [...carts];
    if (carts[index].quantity != 1) {
      newQuantity[index].quantity -= 1;
      setCarts(newQuantity);
      settotalPrice(totalPrice - products[index].price);
    }
  };
  // function totalPrice() {
  //   let result = 0;
  //   carts.map((item) => {
  //     result += item.price * item.quantity;
  //   });
  //   return result;
  // }
  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div style={{ display: "flex" }}>
          {products.map((item, index) => {
            return (
              <div className="product-list" key={index}>
                <div className="product">
                  <img src={item.image} alt={item.name} />
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <button
                    onClick={() => {
                      handleAddCart(index);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <hr />
      <section className="cart">
        <h1 className="cart-heading">
          Cart (Total Price is {totalPrice} Baht)
        </h1>
        <div className="cart-item-list">
          {carts.map((item, index) => (
            <div className="cart-item" key={index}>
              <h1>Item name: {item.name}</h1>
              <h2>Price: {item.price}</h2>
              <h2>Quantity:{item.quantity}</h2>
              <button
                className="delete-button"
                onClick={() => {
                  handleDeleteCart(item.index);
                }}
              >
                x
              </button>
              <div className="quantity-actions">
                <button
                  className="add-quantity"
                  onClick={() => {
                    handleAddQuantity(index);
                  }}
                >
                  +
                </button>
                <button
                  className="subtract-quantity"
                  onClick={() => {
                    handleMinusQuantity(index);
                  }}
                >
                  -
                </button>
              </div>
            </div>
            // <CartList
            //   name={item.name}
            //   price={item.price}
            //   Ondelete={handleDeleteCart}
            //   index={index}
            //   // quantity={quantity}
            //   // AddQuantity={handleAddQuantity}
            //   // MinusQuatity={handleMinusQuantity}
            // />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
