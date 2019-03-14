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
    console.log(this.props);
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

  handleClick() {
    console.log("add attempt", this.state.product);
    let favorites = this.props.favorites;
    let lengthBefore = favorites.length;
    let favorites2 = favorites.filter(
      prod => prod._id !== this.state.product._id
    );
    if (lengthBefore === favorites2.length) {
      this.props.addToFavorite(this.state.product);
      favorites2.push(this.state.product);
      this.setState({
        ...this.state,
        favorite: !this.state.favorite
      });
    } else {
      this.props.removeFromFavorites(this.state.product);
      this.setState({
        ...this.state,
        favorite: !this.state.favorite
      });
    }
  }
  render() {
    return (
      <div>
        <button className="buttonAdd" onClick={this.handleClick}>
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
