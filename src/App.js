import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ListOfQuestion from "./components/ListOfQuestion";
import QuestionPage from "./components/QuestionPage";
import QuestionAnswerPage from "./components/QuestionAnswerPage";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/post" className="">
              Ask a question
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/QList" className="nav-link">
                    All Questions
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Switch>
            <Route path="/" exact component={QuestionPage} />
            <Route path="/post/" component={QuestionPage} />
            <Route path="/QList/" component={ListOfQuestion} />
            <Route
              path="/QAnswer/:id"
              render={props => <QuestionAnswerPage {...props} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
