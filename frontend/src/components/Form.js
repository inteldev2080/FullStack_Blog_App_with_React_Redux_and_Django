import React, { Component } from "react";
import { connect } from "react-redux";
import { addBlogs } from "../actions/blogs";

export class Form extends Component {
  // toggle new blog
  toggleBlog = () => {
    this.props.toggleNewBlog();
    window.location.reload(); // to see new blog button again in navbar
  };

  // form submission (with new blog data)
  onSubmit = (e) => {
    e.preventDefault();
    const title = this.getTitle.value;
    const description = this.getDescription.value;
    const newBlogData = { title, description };
    this.props.addBlogs(newBlogData);

    // setting the fields back to empty once the form is submitted
    this.getTitle.value = "";
    this.getDescription.value = "";
    window.location.reload(); // to see new blog button again in navbar
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <h3>New Blog</h3>
          <label>Title</label>
          <input
            autoFocus={true}
            className="form-control"
            type="text"
            placeholder="your title"
            ref={(input) => (this.getTitle = input)}
            value={this.getTitle}
            required
          />
          <br />
          <label>Description</label>
          <textarea
            className="form-control"
            placeholder="your description"
            name="description"
            ref={(input) => (this.getDescription = input)}
            onChange={this.onChange}
            value={this.getDescription}
            rows="18"
            cols="41"
            required
          />
          <br />
          <button className="btn btn-success" type="submit">
            Save
          </button>
          <button className="btn btn-danger ml-2" onClick={this.toggleBlog}>
            Cancel
          </button>
        </form>
        <br />
      </div>
    );
  }
}

export default connect(null, { addBlogs })(Form);
