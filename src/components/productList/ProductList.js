import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchProducts,
  addFavorite,
  refreshFavorites
} from "../../actions/productActions";

class ProductList extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchProducts();
  }

  handleClick(product) {
    this.props.addFavorite(product);
    const ListOfFavorites = this.props.favorites;
    ListOfFavorites.push(product);

    this.props.refreshFavorites(ListOfFavorites);
    console.log(this.props.favorites);
    console.log(ListOfFavorites);
  }
  /* 
  componentWillReceiveProps(nextProps) {
    const favList = this.props.favorites;
  } */

  render() {
    const productList = this.props.products.map(product => (
      <div key={product.id}>
        <button onClick={() => this.handleClick(product)}>Add to fav</button>
        <h1>{product.name}</h1>
        <img src={"http://localhost:3000/images/" + product.image} />
      </div>
    ));

    return (
      <div>
        <p>ProductList works</p>
        {productList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.productReducer.products,
  favorites: state.productReducer.favorites,
  fav: state.productReducer.fav
});

export default connect(
  mapStateToProps,
  { fetchProducts, addFavorite, refreshFavorites }
)(ProductList);
