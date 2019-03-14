import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteProduct } from "../../actions/productActions";

class DeleteProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick() {
    this.props.deleteProduct(this.props.id);
  }

  render() {
    return (
      <div>
        <button
          onClick={this.onDeleteClick}
          className="btnDetail"
          style={{ color: "red" }}
        >
          Delete item
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { deleteProduct }
)(DeleteProduct);
