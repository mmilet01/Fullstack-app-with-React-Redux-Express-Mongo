import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchProducts,
  addToFavorite,
  removeFromFavorites,
  searchProducts
} from "../../actions/productActions";
import "./ProductList.css";
import { Link } from "react-router-dom";
import AddFavorite from "../AddToFav/AddFavorite";
import Grades from "../Grades/Grades";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prod: this.props.products
    };
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    this.props.fetchProducts();
  }

  onChange(e) {
    const { value } = e.target;
    this.props.searchProducts(value);
  }

  render() {
    const productList = this.props.searched.map(product => (
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
    ));

    return (
      <div>
        <input
          type="text"
          placeholder="SEARCH PRODUCTS"
          name="search"
          onChange={this.onChange}
        />
        <div className="productsContainer">{productList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.productReducer.products,
  favorites: state.productReducer.favorites,
  searched: state.productReducer.searched
});

export default connect(
  mapStateToProps,
  { fetchProducts, addToFavorite, removeFromFavorites, searchProducts }
)(ProductList);
