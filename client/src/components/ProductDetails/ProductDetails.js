import React, { Component } from "react";
import "./ProductDetails.css";
import AddFavorite from "../AddToFav/AddFavorite";
import { connect } from "react-redux";
import Grades from "../Grades/Grades";
import PropTypes from "prop-types";
import { fetchProducts } from "../../actions/productActions";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import Comments from "../Comments/Comments";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loading: true
    };
  }

  componentDidMount() {
    console.log("MOUNTING");
    this.props.fetchProducts();
    /* this.setState({
      product: this.props.products.find(
        prod => prod._id == this.props.match.params.id
      ),
      loading: !this.state.loading
    }); */
  }

  render = () => {
    console.log("RENDERING");

    const product = this.props.products.find(
      prod => prod._id == this.props.match.params.id
    );
    /* let recenzije = product.recenzije.map(rec => (
      <div>
        <h3>{rec.username}</h3>
        <p>{rec.recenzija}</p>
      </div>
    )); */

    console.log(product);
    return (
      <div>
        {!!product ? (
          <div className="detailProduct">
            <h1>{product.name}</h1>
            <div className="product-container">
              {/*           <img src={"http://localhost:3000/images/" + product.image} />
               */}{" "}
              <div className="about-product">
                <p>{product.graphics}</p>
                <p>{product.operatingSystem}</p>
                <p>{product.processor}</p>
                <p>{product.RAM}GB</p>
                <p>{product.SSD}GB</p>
                <p>{product.price} kn</p>
                <Grades product={product} />
                <AddFavorite product={product} />
                <DeleteProduct id={product._id} />
              </div>
            </div>
            <Comments product={product} />
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    );
  };
}
/* ProductDetails.propTypes = {
  products: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired
}; */

const mapStateToProps = state => ({
  products: state.productReducer.products,
  favorites: state.productReducer.favorites
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(ProductDetails);
