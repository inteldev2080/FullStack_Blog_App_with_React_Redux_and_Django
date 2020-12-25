import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Blogs from "./Blogs";
import store from "../store";
import Form from "./Form";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./accounts/login";
import Register from "./accounts/Register";
import Navbar from "./Navbar";
import PrivateRoute from "./common/PrivateRoute";
import { loadUser } from "../actions/auth";

class App extends Component {
  state = {
    newBlog: false,
    hideAllBlogs: false,
  };

  //
  showAllBlogs = () => {
    this.setState({
      hideAllBlogs: true,
    });
  };

  // toggle new blog form
  toggleNewBlog = () => {
    this.setState({
      newBlog: !this.state.newBlog,
    });
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar
              toggleNewBlog={this.toggleNewBlog}
              showAllBlogs={this.showAllBlogs}
            />
            <Switch>
              <PrivateRoute
                exact
                path="/"
                component={() => (
                  <Fragment>
                    {this.state.newBlog ? (
                      <Form toggleNewBlog={this.toggleNewBlog} />
                    ) : (
                      ""
                    )}
                    <Blogs hideAllBlogs={this.state.hideAllBlogs} />
                  </Fragment>
                )}
              />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
