const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin1@cluster0-jcmuy.mongodb.net/test?retryWrites=true", {
    useNewUrlParser: true
  });
  const connection = mongoose.connection;
  
  connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });
  

  