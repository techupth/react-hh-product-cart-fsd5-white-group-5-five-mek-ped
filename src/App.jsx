import "./App.css";
import { useState } from "react";
import products from "./data/products";

// {
//   id: 1,
//   name: "Fond - Neutral",
//   price: 160,
//   image: "http://dummyimage.com/350x350.png/dddddd/000000",
//   description: "Morbi non quam nec dui luctus rutrum. Nulla tellus.",
// }

function App() {
  const [productCart, setProductCart] = useState([]);

  const addToCartButton = (product) => {
    //check- Is product already in cart?
    const alreadyInCart = productCart.find((item) => item.id === product.id);
    if (alreadyInCart) {
      let itemIndex = productCart.findIndex((item) => item.id === product.id);
      let updateCart = [...productCart];
      updateCart[itemIndex].quantity = updateCart[itemIndex].quantity + 1;
      setProductCart(updateCart);
    } else {
      let addNewProduct = {};
      addNewProduct = { ...product, quantity: 1 };
      setProductCart([...productCart, addNewProduct]);
    }
  };

  const deleteProductInCart = (itemId) => {
    const newProductCart = productCart.filter((item) => item.id !== itemId);
    setProductCart(newProductCart);
  };

  const addQuantity = (itemId) => {
    let itemIndex = productCart.findIndex((item) => item.id === itemId);
    let updateCart = [...productCart];
    updateCart[itemIndex].quantity = updateCart[itemIndex].quantity + 1;
    setProductCart(updateCart);
  };

  const subtractQuantity = (itemId) => {
    let itemIndex = productCart.findIndex((item) => item.id === itemId);
    let updateCart = [...productCart];

    // if quantity = 1 then get rid off product
    if (updateCart[itemIndex].quantity === 1) {
      const newProductCart = updateCart.filter((item) => item.id !== itemId);
      setProductCart(newProductCart);
    } else {
      updateCart[itemIndex].quantity = updateCart[itemIndex].quantity - 1;
      setProductCart(updateCart);
    }
  };
  const totalPriceInCart = productCart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {/* <div className="product">
            <img
              src="http://dummyimage.com/350x350.png/dddddd/000000"
              alt="sample name"
            />
            <h2>Sample name</h2>
            <p>Sample desc</p>
            <button>Add to cart</button>
          </div> */}

          {products.map((product) => {
            return (
              <div className="product" key={product.id}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <button onClick={() => addToCartButton(product)}>
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          `Cart (Total Price is ${totalPriceInCart.toLocaleString()} Baht)`
        </h1>
        <div className="cart-item-list">
          {/* <div className="cart-item">
            <h1>Item name: Fond - Neutral</h1>
            <h2>Price: 160 Baht</h2>
            <h2>Quantity: 2</h2>
            <button className="delete-button">x</button>
            <div className="quantity-actions">
              <button className="add-quantity">+</button>
              <button className="subtract-quantity">-</button>
            </div>
          </div> */}
          {productCart.map((product) => {
            return (
              <div className="cart-item" key={product.id}>
                <h1>Item name:{product.name}</h1>
                <h2>Price: {product.price}</h2>
                <h2>Quantity: {product.quantity}</h2>
                <button
                  className="delete-button"
                  onClick={() => deleteProductInCart(product.id)}
                >
                  x
                </button>
                <button
                  className="add-quantity"
                  onClick={() => addQuantity(product.id)}
                >
                  +
                </button>
                <button
                  className="subtract-quantity"
                  onClick={() => subtractQuantity(product.id)}
                >
                  -
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
