import React, { Component } from "react";
import { Link,Route } from "react-router-dom";
import axios from "axios";

const Question = props => (
  <tr>
    <td>{props.question.name}</td>
    <td>{props.question.title}</td>
    <td>{props.question.input}</td>
    <td>{props.question.created_date}</td>
    <td>
       <Link to={"/QAnswer/" + props.question._id}>Replay</Link>
    </td>
  </tr>
);

class ListOfQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/questions/")
      .then(response => {
        this.setState({ questions: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  questionList() {
    return this.state.questions.map(function(currentQuestion, i) {
      return <Question question={currentQuestion} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Question List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Question</th>
              <th>DateTime</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.questionList()}</tbody>
        </table>
      </div>
    );
  }
}
export default ListOfQuestion;

