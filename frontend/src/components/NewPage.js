import React, { Component } from "react";

export class NewPage extends Component {
  state = {
    thisBlogData: {
      id: this.props.cloneId,
      title: this.props.cloneTitle,
      description: this.props.cloneDescription,
    },
  };

  // toggle udpate
  toggleHOU = () => {
    this.props.toggleHideOnUpdate();
  };

  // from Blogs.js
  runHandleEdits = () => {
    this.props.handleEdits(this.state.thisBlogData);
  };

  render() {
    console.log("in newpage", this.props.cloneTitle);
    return (
      <div>
        <h3>{this.props.cloneTitle}</h3>
        <p className="shadow p-3 mb-5 bg-white rounded justify-description-css">
          {this.props.cloneDescription}
        </p>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            this.runHandleEdits();
            this.toggleHOU();
          }}
        >
          edit
        </button>
      </div>
    );
  }
}

export default NewPage;
