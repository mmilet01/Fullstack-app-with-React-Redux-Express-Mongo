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
import InputForm from "../InputForm/InputForm";
import DeleteProduct from "../DeleteProduct/DeleteProduct";

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

    return (
      <div>
        <input
          type="text"
          placeholder="SEARCH PRODUCTS"
          name="search"
          onChange={this.onChange2}
          value={this.state.value}
        />
        <InputForm />
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
  products: state.productReducer
});

export default connect(
  mapStateToProps,
  {
    fetchProducts,
    addToFavorite,
    removeFromFavorites,
    addNewItem,
    searchProducts
  }
)(ProductList);
