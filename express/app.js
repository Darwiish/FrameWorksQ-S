const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors"); /* CORS is a node.js package for providing a Connect/Express middleware that can be used to */
const mongoose = require("mongoose");
const DbConnection = require("./DataAccess/DbConnection");
const PORT = 4000;
const answerRoutes = express.Router();
const questionRoutes = express.Router(); /*we create an instance of the Express Router by adding this code*/
app.use(cors());
app.use(bodyParser.json());

let Question = require("./DataAccess/QuestionSchema.model");
let Answer = require("./DataAccess/AnswerSchema.model");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  // intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    // respond with 200
    console.log("Allowing OPTIONS");
    res.sendStatus(200);
  } else {
    // move on
    next();
  }
});

/****** Helper functions *****/
// 

/****** Routes *****/
app.get("/questions", (req, res) => {
  Question.find((err, questions) => {
    res.json(questions);
  });
});

app.get("/questions/:id", (req, res) => {
  Question.findById(req.params.id, (err, question) => {
    res.json(question);
  });
});

app.post("/questions/add", (req, res) => {
  let question = new Question(req.body);
  question.save().then(question => {
    if (err) {
      res.status(400).send("adding new question failed");
    }
    res.json(question);
  });
});

app.put("/questions/:id", (req, res) => {
  res.json(getQuestionFromId(req.params.id));
});

/////////////////////////////Answer//////////////////////////////////////////

app.get("/answers", (req, res) => {
  Answer.find((err, answers) => {
    res.json(answers);
  });
});

app.get("/answers/:id", (req, res) => {
  Answer.findById(req.params.id, (err, answer) => {
    res.json(answer);
  });
});

app.get("/questions/:id/answers", (req, res) => {
  Answer.find((err, answers) => {
    res.json(answers);
  });
});

app.post("/answers/add", (req, res) => {
  let answer = new Answer(req.body);
  answer.save().then(answer => {
    if (err) {
      res.status(400).send("adding new answer failed");
    }
    res.json(answer);
  });
});

app.use(
  "/questions",
  questionRoutes,
  answerRoutes
); /*We add the router as a middleware and will take control of request starting with path /questions:*/

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
