import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  deleteProduct,
  addNewItem
} from "../../actions/productActions";
import axios from "axios";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      processor: "",
      operatingSystem: "",
      graphics: "",
      SSD: "",
      RAM: "",
      price: "",
      ocjene: [],
      _id: ""
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    this.props.fetchProducts();
    const product = this.props.products.find(
      prod => prod._id == this.props.match.params.id
    );
    this.setState({
      name: product.name,
      processor: product.processor,
      operatingSystem: product.operatingSystem,
      graphics: product.graphics,
      SSD: product.SSD,
      RAM: product.RAM,
      price: product.price
    });
  }
  onSubmit(e) {
    e.preventDefault();
    let newItem = {
      name: this.state.name,
      processor: this.state.processor,
      operatingSystem: this.state.operatingSystem,
      graphics: this.state.graphics,
      RAM: this.state.RAM,
      SSD: this.state.SSD,
      price: this.state.price
    };

    axios.put(
      `http://localhost:5000/edit/${this.props.match.params.id}`,
      newItem
    );
    window.location.reload();

    this.props.history.push("/");
  }
  onInputChange(e) {
    const { value } = e.target;
    this.setState({
      ...this.state,
      [e.target.name]: value
    });
  }
  render() {
    return (
      <div>
        <form>
          <input
            name="name"
            type="text"
            placeholder="name"
            value={this.state.name}
            onChange={this.onInputChange}
          />
          <input
            name="processor"
            type="text"
            placeholder="processor"
            value={this.state.processor}
            onChange={this.onInputChange}
          />
          <input
            name="graphics"
            type="text"
            placeholder="graphics"
            value={this.state.graphics}
            onChange={this.onInputChange}
          />
          <input
            name="operatingSystem"
            type="text"
            placeholder="operatingSystem"
            value={this.state.operatingSystem}
            onChange={this.onInputChange}
          />
          <input
            name="price"
            type="text"
            placeholder="price"
            value={this.state.price}
            onChange={this.onInputChange}
          />
          <input
            name="SSD"
            type="text"
            placeholder="SSD"
            value={this.state.SSD}
            onChange={this.onInputChange}
          />
          <input
            name="RAM"
            type="text"
            placeholder="RAM"
            value={this.state.RAM}
            onChange={this.onInputChange}
          />
          <Link to="/">
            <button className="btnDetail" onClick={this.onSubmit}>
              EDIT
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.productReducer.products
});

export default connect(
  mapStateToProps,
  { fetchProducts, deleteProduct, addNewItem }
)(EditProduct);
