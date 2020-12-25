import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

export class Navbar extends Component {
  state = {
    hideNewBlogButton: false,
  };

  toggleHideButton = () => {
    this.setState({
      hideNewBlogButton: !this.state.hideNewBlogButton,
    });
  };

  toggleBlog = () => {
    this.props.toggleNewBlog();
  };

  // toggle showAllBlogs (from App.js)
  toggleBlogs = () => {
    this.props.showAllBlogs();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div>
        <span onClick={this.props.logout}>
          <a href="#">Logout</a>
        </span>
      </div>
    );

    const guestLinks = (
      <div>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </div>
    );

    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <i className="fas fa-home"> Home</i>
          </a>
          {this.state.hideNewBlogButton || !isAuthenticated ? (
            ""
          ) : (
            <span
              className="link-css"
              onClick={() => {
                this.toggleBlog();
                this.toggleHideButton();
                this.props.showAllBlogs();
              }}
            >
              New Blog
            </span>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav w-100">
              <div className="nav-item dropdown ml-auto">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {user ? (
                    `Welcome, ${user.username}`
                  ) : (
                    <i className="fas fa-user-circle fa-2x"></i>
                  )}
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <span className="dropdown-item" href="#">
                    {isAuthenticated ? authLinks : guestLinks}
                  </span>
                </div>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
