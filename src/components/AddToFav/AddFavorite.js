import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addToFavorite,
  removeFromFavorites
} from "../../actions/productActions";
import "./AddFavorite.css";

class AddFavorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      favorite: this.props.favorites.find(
        prod => prod.name === this.props.product.name
      )
        ? true
        : false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(product) {
    let favorites = this.props.favorites;
    let lengthBefore = favorites.length;
    let favorites2 = favorites.filter(prod => prod.id !== product.id);
    if (lengthBefore === favorites2.length) {
      this.props.addToFavorite(product);
      favorites2.push(product);
      this.setState({
        ...this.state,
        favorite: !this.state.favorite
      });
    } else {
      this.props.removeFromFavorites(product);
      this.setState({
        ...this.state,
        favorite: !this.state.favorite
      });
    }
  }
  render() {
    return (
      <div>
        <button
          className="buttonAdd"
          onClick={() => this.handleClick(this.state.product)}
        >
          {!this.state.favorite ? (
            <p>Add to favorites</p>
          ) : (
            <p>Remove from favorites</p>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.productReducer.favorites
});

export default connect(
  mapStateToProps,
  { addToFavorite, removeFromFavorites }
)(AddFavorite);
