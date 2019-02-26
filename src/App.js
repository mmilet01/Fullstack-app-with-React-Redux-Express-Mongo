import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ProductList from "./components/productList/ProductList";
import { Provider } from "react-redux";
import store from "./store/store";
import FavoriteList from "./components/FavoriteList/FavoriteList";

class App extends Component {
  render() {
    return (
      <Provider store={store()}>
        <div className="App">
          <header className="App-header">
            <h1>Starting from scccratch</h1>
            <div style={{ display: "flex" }}>
              <ProductList />
              <FavoriteList />
            </div>
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
