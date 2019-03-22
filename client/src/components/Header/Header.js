import React, { Component } from "react";
import "./Header.css";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    return (
      <div>
        {this.props.auth.isLoggedIn ? (
          <h2>Computer web shop, welcome {this.props.auth.user.username}</h2>
        ) : (
          <h2>Computer web shop</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(Header);
