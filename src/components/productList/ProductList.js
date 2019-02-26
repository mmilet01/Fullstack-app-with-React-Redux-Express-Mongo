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

class ProductList extends Component {
  constructor() {
    super();
    /*   this.state = {
      fav: []
    }; */
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchProducts();
  }

  handleClick(product) {
    let favorites = this.props.favorites;
    let lengthBefore = favorites.length;
    let favorites2 = favorites.filter(prod => prod.id !== product.id);
    if (lengthBefore === favorites2.length) {
      this.props.addToFavorite(product);
      favorites2.push(product);
    } else {
      this.props.removeFromFavorites(product);
    }
  }
  onChange(e) {
    const { value } = e.target;
    this.props.searchProducts(value);
  }

  render() {
    const productList = this.props.products.map(product => (
      <div key={product.id} className="productCard">
        <button onClick={() => this.handleClick(product)}>Add to fav</button>
        <div className="imgDiv">
          <img src={"http://localhost:3000/images/" + product.image} />
        </div>
        <h3>{product.name}</h3>
        <p className="price">{product.price} kn</p>
        {/*       ocjene
         */}{" "}
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
          placeholder="search products"
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
  favorites: state.productReducer.favorites
});

export default connect(
  mapStateToProps,
  { fetchProducts, addToFavorite, removeFromFavorites, searchProducts }
)(ProductList);
