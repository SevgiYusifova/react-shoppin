//feature 1
import React from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
    };
  }
  createOrder = (order) => {
    alert("need to save order for" +  order.name);
  };
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    // instances of cart items
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    ); //1st is key,2nd is value
    //we set the filter data inside the state, because of the filter we use this.state.cartItems
  };
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyIncart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyIncart = true;
      }
    });
    if (!alreadyIncart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems }); //update state,setting state
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); //1st is key,2nd is value
  };
  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };
  filterProducts = (event) => {
    //method(arrow functions) let u access the setstate method
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React shopping cart</a>
        </header>

        <main>
          <div className="content">
            <div className="main">
              <Filter
                size={this.state.size}
                sort={this.state.sort}
                count={this.state.products.length}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                createOrder={this.createOrder}
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
              />
            </div>
          </div>
        </main>

        <footer>All rights is reserved.</footer>
      </div>
    );
  }
}

export default App;
