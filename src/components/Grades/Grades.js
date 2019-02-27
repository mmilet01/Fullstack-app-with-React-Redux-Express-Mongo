import React, { Component } from "react";
import { connect } from "react-redux";

class Grades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prod: this.props.products.find(prod => prod.id === this.props.product.id)
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick(number) {
    this.props.products
      .find(prod => prod.id === this.props.product.id)
      .ocjene.push(number);

    this.setState({
      prod: this.props.products.find(prod => prod.id === this.props.product.id)
    });
  }

  render() {
    console.log(this.state.prod.ocjene);
    let ocjene = 0;
    this.state.prod.ocjene.map(ocj => (ocjene += ocj));
    let ocjena = 0;
    ocjena = ocjene / this.state.prod.ocjene.length;
    ocjena = Math.round(ocjena);
    return (
      <div>
        <p>Grades works</p>
        <button onClick={() => this.onClick(1)}>1</button>
        <button onClick={() => this.onClick(2)}>2</button>
        <button onClick={() => this.onClick(3)}>3</button>
        <button onClick={() => this.onClick(4)}>4</button>
        <button onClick={() => this.onClick(5)}>5</button>
        <p>
          {ocjena} na temelju {this.state.prod.ocjene.length}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.productReducer.products
});

export default connect(mapStateToProps)(Grades);
