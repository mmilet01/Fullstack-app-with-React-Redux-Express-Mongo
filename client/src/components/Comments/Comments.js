import React, { Component } from "react";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product
    };
  }

  componentWillMount() {}

  render() {
    const recenzije = this.state.product.recenzije.map(rec => (
      <div>
        <h3>{rec.username}</h3>
        <p>{rec.recenzija}</p>
      </div>
    ));
    return (
      <div>
        <h3>Rezencije</h3>
        {recenzije}
      </div>
    );
  }
}
export default Comments;
