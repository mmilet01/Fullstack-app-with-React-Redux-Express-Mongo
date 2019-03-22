import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { Link } from "react-router-dom";

export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
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
    const { email, password } = this.state;
    const user = { email, password };
    this.props.login(user);
  }
  render() {
    return (
      <div>
        <Link to="/">
          <button className="btnDetail">Product List</button>
        </Link>
        <form onSubmit={this.onSubmit}>
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
          <button>Login</button>
          {this.props.auth.errorMsg.msg ? (
            <p>{this.props.auth.errorMsg.msg}</p>
          ) : null}
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(
  mapStateToProps,
  { login }
)(LoginForm);
