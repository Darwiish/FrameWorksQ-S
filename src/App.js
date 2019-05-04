import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
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

            <Link to="/questions" className="nav-link">
              All Questions
            </Link>
            
            <Link to="/post" className="nav-link">
              Ask a question
            </Link>
          </nav>
          <br />
          <Switch>
            <Route path="/" exact component={QuestionPage} />
            <Route path="/post/" component={QuestionPage} />
            <Route path="/questions/" component={ListOfQuestion} />
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
