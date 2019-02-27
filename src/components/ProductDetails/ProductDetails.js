import React, { Component } from "react";
import "./ProductDetails.css";
import AddFavorite from "../AddToFav/AddFavorite";
import { connect } from "react-redux";
import Grades from "../Grades/Grades";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      recenzije: []
    };
  }
  componentWillMount() {
    const id = +this.props.match.params.id;
    let newProduct = this.props.products.find(prod => prod.id === id);
    this.setState({
      product: newProduct,
      recenzije: newProduct.recenzije
    });
  }

  render() {
    const product = this.state.product;
    const recenzije = this.state.recenzije.map(rec => (
      <div>
        <h3>{rec.username}</h3>
        <p>{rec.recenzija}</p>
      </div>
    ));
    return (
      <div className="detailProduct">
        <h1>{product.name}</h1>
        <div className="product-container">
          <img src={"http://localhost:3000/images/" + product.image} />
          <div className="about-product">
            <p>{product.graphics}</p>
            <p>{product.operatingSystem}</p>
            <p>{product.processor}</p>
            <p>{product.RAM}GB</p>
            <p>{product.SSD}GB</p>
            <p>{product.price} kn</p>
            <Grades product={product} />
            <AddFavorite product={product} />
          </div>
        </div>
        <h3>Recenzije</h3>
        {recenzije}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.productReducer.products,
  favorites: state.productReducer.favorites
});

export default connect(mapStateToProps)(ProductDetails);
