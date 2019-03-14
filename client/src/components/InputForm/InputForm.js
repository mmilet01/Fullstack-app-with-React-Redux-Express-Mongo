import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewItem } from "../../actions/productActions";

class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: true,
      name: "",
      processor: "",
      operatingSystem: "",
      graphics: "",
      SSD: 0,
      RAM: 0,
      price: 0
    };
    this.addNew = this.addNew.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  addNew() {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    });
  }

  onInputChange(e) {
    const { value } = e.target;
    this.setState({
      ...this.state,
      [e.target.name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("submiting");
    let newItem = {
      name: this.state.name,
      processor: this.state.processor,
      operatingSystem: this.state.operatingSystem,
      graphics: this.state.graphics,
      RAM: this.state.RAM,
      SSD: this.state.SSD,
      price: this.state.price
      /*       ocjene: [],
       */
    };
    this.props.addNewItem(newItem);
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    });
    window.location.reload();
  }

  render() {
    return (
      <div>
        {this.state.isOpen ? (
          <button onClick={this.addNew}>Add new</button>
        ) : (
          <form>
            <p>Incomming form</p>
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
            <button
              onClick={() => {
                this.setState({ ...this.state, isOpen: !this.state.isOpen });
              }}
            >
              Cancel
            </button>

            <button onClick={this.onSubmit}>Add new</button>
          </form>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  products: state.productReducer.products
});
export default connect(
  mapStateToProps,
  { addNewItem }
)(InputForm);
