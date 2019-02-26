import React, { Component } from "react";
import { connect } from "react-redux";
import "./FavoriteList.css";

class FavoriteList extends Component {
  constructor() {
    super();
    /* this.state = {
      favorites2: []
    };
  } */
  }

  render() {
    const favoriteList = this.props.favorites.map(fav => (
      <div key={fav.id} className="favDiv">
        <p>{fav.name}</p>
      </div>
    ));

    return (
      <div>
        <h1>
          FAVORITES <i class="fa fa-laptop" />
        </h1>
        {favoriteList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.productReducer.favorites
});

export default connect(mapStateToProps)(FavoriteList);
