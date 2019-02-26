import React, { Component } from "react";
import { connect } from "react-redux";

class FavoriteList extends Component {
  constructor() {
    super();
    this.state = {
      favorites2: []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      favorites2: this.props.favorites
    });
  }

  onClick() {
    this.setState({
      favorites2: this.props.favorites
    });
  }

  render() {
    const favoriteList = this.state.favorites2.map(fav => (
      <div key={fav.id}>
        <h1>{fav.name}</h1>
      </div>
    ));

    return (
      <div>
        <h1>Fav list works</h1>
        <p>List</p>
        {favoriteList}
        <button onClick={this.onClick}>reRender</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.productReducer.favorites
});

export default connect(mapStateToProps)(FavoriteList);
