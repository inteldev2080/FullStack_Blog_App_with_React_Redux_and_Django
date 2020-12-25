import React, { Component } from "react";
import { connect } from "react-redux";
import { getBlogs, deleteBlogs } from "../actions/blogs";
import EditBlogs from "./EditBlogs";

export class Blogs extends Component {
  // managing state for update functionality
  state = {
    cloneId: 0,
    cloneTitle: "",
    cloneDescription: "",
    editing: false,
    hideBlogsDuringUpdate: false,
  };

  // toggle hideBlogsDuringUpdate state
  toggleHideOnUpdate = () => {
    this.setState({
      hideBlogsDuringUpdate: !this.state.hideBlogsDuringUpdate,
    });
  };

  // calling the api to fetch items
  componentDidMount() {
    console.log("fetching blogs from api...");
    this.props.getBlogs();
  }

  // handle edits function
  handleEdits = (blog) => {
    this.setState({
      cloneId: blog.id,
      cloneTitle: blog.title,
      cloneDescription: blog.description,
      editing: !this.state.editing,
    });
    console.log("edit button contains", blog);
  };

  // toggle form Editing
  toggleEditing = () => {
    this.setState({
      editing: false,
    });
  };

  render() {
    return (
      <div className="container">
        {this.state.editing ? (
          <EditBlogs
            cloneId={this.state.cloneId}
            cloneTitle={this.state.cloneTitle}
            cloneDescription={this.state.cloneDescription}
            toggleEditing={this.toggleEditing}
            toggleHideOnUpdate={this.toggleHideOnUpdate}
          />
        ) : (
          ""
        )}
        {this.state.hideBlogsDuringUpdate || this.props.hideAllBlogs ? (
          ""
        ) : (
          <div>
            <h3>All Blogs</h3>
            {this.props.blogs.length === 0 ? <li>No blogs yet :(</li> : ""}
            {this.props.blogs.map((blog) => (
              <div
                className="card body card-spacing text-white bg-dark"
                key={blog.id}
              >
                <h4>{blog.title}</h4>
                <hr className="new1"></hr>
                {blog.description}

                {/* Edit Blog */}

                <span
                  className="span-button"
                  onClick={() => {
                    this.handleEdits(blog);
                    this.toggleHideOnUpdate();
                  }}
                >
                  <i className="edit-button far fa-edit fa-2x button-css" />
                </span>

                {/* Delete Blog */}

                <span
                  className="span-button"
                  onClick={this.props.deleteBlogs.bind(this, blog.id)}
                >
                  <i className="delete-button fas fa-trash fa-2x ml-2 button-css" />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs, // from combine reducer and initial state of reducer
});

export default connect(mapStateToProps, { getBlogs, deleteBlogs })(Blogs);
