import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchProducts,
  addToFavorite,
  removeFromFavorites,
  searchProducts,
  addNewItem
} from "../../actions/productActions";
import "./ProductList.css";
import { Link } from "react-router-dom";
import AddFavorite from "../AddToFav/AddFavorite";
import Grades from "../Grades/Grades";
import PropTypes from "prop-types";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import { logout } from "../../actions/authActions";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*       prod: this.props.products,
       */ value: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onChange2 = this.onChange2.bind(this);
  }
  componentDidMount() {
    /*     console.log(this.props);
     */ this.props.fetchProducts();
    /*     console.log(this.props.products.products);
     */
  }
  onDeleteClick() {}

  onChange(e) {
    const { value } = e.target;
    this.props.searchProducts(value);
  }

  onChange2(e) {
    const { value } = e.target;
    this.setState({
      value: value
    });
  }

  render() {
    /*  const productList =  */

    /*  const productList = this.props.searched.map(product => (
      <div key={product.id} className="productCard">
        <AddFavorite product={product} />
        <div className="imgDiv">
          <img src={"http://localhost:3000/images/" + product.image} />
        </div>
        <h3>{product.name}</h3>
        <p className="price">{product.price} kn</p>
        <Grades product={product} />
        <div>
          <h4>Operating system: {product.operatingSystem}</h4>
          <h4>Processor: {product.processor}</h4>
          <h4>SSD: {product.SSD}GB</h4>
        </div>
        <Link to={"/details/" + product.id}>
          <button className="btnDetail">Details</button>
        </Link>
      </div>
    )); */
    const RegAndLogin = (
      <div>
        <Link to="/register">
          <button className="btnDetail">Register</button>
        </Link>
        <Link to="/login">
          <button className="btnDetail">Login</button>
        </Link>
      </div>
    );
    const Logout = (
      <div>
        <button onClick={this.props.logout} className="btnDetail">
          Logout
        </button>
      </div>
    );

    return (
      <div>
        <input
          type="text"
          placeholder="SEARCH PRODUCTS"
          name="search"
          onChange={this.onChange2}
          value={this.state.value}
        />
        <Link to="/addProduct">
          <button className="btnDetail">Add new product</button>
        </Link>
        {this.props.auth.isLoggedIn ? Logout : RegAndLogin}
        <div className="productsContainer">
          {this.props.products.products
            .filter(prod =>
              prod.name.toUpperCase().includes(this.state.value.toUpperCase())
            )
            .map(product => (
              <div key={product._id} className="productCard">
                <AddFavorite product={product} />
                {/* <div className="imgDiv">
                  <img src={"http://localhost:3000/images/" + product.image} />
                </div> */}
                <h3>{product.name}</h3>
                <p className="price">{product.price} kn</p>
                <Grades product={product} />

                <div>
                  <h4>Operating system: {product.operatingSystem}</h4>
                  <h4>Processor: {product.processor}</h4>
                  <h4>SSD: {product.SSD}GB</h4>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Link to={"/details/" + product._id}>
                    <button className="btnDetail">Details</button>
                  </Link>
                  <DeleteProduct id={product._id} />
                  <Link to={"/editProduct/" + product._id}>
                    <button className="btnDetail">EDIT</button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.object.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  addToFavorite: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  searchProducts: PropTypes.func.isRequired,
  addNewItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.productReducer,
  auth: state.authReducer
});

export default connect(
  mapStateToProps,
  {
    fetchProducts,
    addToFavorite,
    removeFromFavorites,
    addNewItem,
    searchProducts,
    logout
  }
)(ProductList);
