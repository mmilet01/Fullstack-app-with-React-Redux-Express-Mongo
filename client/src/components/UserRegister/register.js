import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { Link } from "react-router-dom";

export class registerUser extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
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
    const { email, password, username } = this.state;
    const newUser = {
      email,
      password,
      username
    };

    this.props.register(newUser);
  }
  render() {
    return (
      <div>
        <Link to="/">
          <button className="btnDetail">Product List</button>
        </Link>
        <form onSubmit={this.onSubmit}>
          <input
            name="username"
            type="text"
            placeholder="username"
            value={this.state.username}
            onChange={this.onInputChange}
          />
          <input
            name="email"
            type="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.onInputChange}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.onInputChange}
          />
          <button>Register</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { register }
)(registerUser);
