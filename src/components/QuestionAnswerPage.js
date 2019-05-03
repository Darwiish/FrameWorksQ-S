import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Votes from "./Votes";

const Answer = props => (
  <tr>
    <td>{props.answers.name}</td>
    <td>{props.answers.input}</td>
    <td>{props.answers.created_date}</td>
    <td>{props.answers.votes} <Votes id={props.answers._id} votes={props.answers.votes}/></td>
  </tr>
);

class QuestionAnswerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: {},
      answers: [],
      name: "",
      input: "",
      created_date:"",
      replyTo: ""
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleInputChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const newAnswer = {
      name: this.state.name,
      input: this.state.input,
      created_date: this.state.created_date,
      replyTo: this.props.match.params.id,
      votes: 0
    };

    axios
      .post("http://localhost:4000/api/answers/add", newAnswer)
      .then(res => console.log(res.data));

    this.setState({
      name: "",
      input: "",
      created_date:"",
      replyTo: this.props.match.params.id,
      votes: 0
    });
  };
  componentDidMount() {
    this.setState({
      replyTo: this.props.match.params.id
    });
    axios.get("http://localhost:4000/api/questions/").then(response => {
      this.setState({
        currentQuestion: response.data.find(
          elm => elm._id === this.props.match.params.id
        )
      });
    });

    axios
      .get("http://localhost:4000/api/answers/")
      .then(response => {
        this.setState({ answers: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  ALLAnswer() {
    return this.state.answers
      .filter(e => e.replyTo === this.props.match.params.id)
      .map(function(currentAnswers, i) {
        return <Answer answers={currentAnswers} key={i} />;
      });
  }
  render() {
    return (
      <div>
        <h3>Question</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Question</th>
              <th>DateTime</th>
            </tr>
            <tr>
              <th>{this.state.currentQuestion.title}</th>
              <th>{this.state.currentQuestion.input}</th>
              <th>{this.state.currentQuestion.created_date}</th>
            </tr>
          </thead>
          <tbody />
        </table>
        <h3>Answers</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>input</th>
              <th>DateTime</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>{this.ALLAnswer()}</tbody>
        </table>
        <div style={{ marginTop: 10 }}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Answer: </label>
              <textarea
                text="textarea"
                className="form-control"
                value={this.state.input}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Submit Answer"
                className="btn btn-success btn-block"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default QuestionAnswerPage;
