import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ProductList from "./components/productList/ProductList";
import { Provider } from "react-redux";
import store from "./store/store";
import FavoriteList from "./components/FavoriteList/FavoriteList";
import Header from "./components/Header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import InputForm from "./components/InputForm/InputForm";
import EditProduct from "./components/EditProduct/EditProduct";
import UserRegister from "./components/UserRegister/register";
import LoginForm from "./components/LoginForm/LoginForm";
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <Header />
            <div className="content">
              <Route exact path="/" component={ProductList} />
              <Route path="/details/:id" component={ProductDetails} />
              <Route path="/addProduct" component={InputForm} />
              <Route path="/editProduct/:id" component={EditProduct} />
              <Route path="/register" component={UserRegister} />
              <Route path="/login" component={LoginForm} />
              <FavoriteList />
            </div>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
