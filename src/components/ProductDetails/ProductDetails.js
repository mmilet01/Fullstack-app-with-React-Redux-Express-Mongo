import React, { Component } from "react";
import "./ProductDetails.css";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }
  componentWillMount() {
    const id = +this.props.match.params.id;
    fetch("http://localhost:3000/products.json")
      .then(data => data.json())
      .then(products => products.find(prod => prod.id === id))
      .then(prodd =>
        this.setState({
          product: prodd
        })
      );
  }

  render() {
    const product = this.state.product;
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
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
