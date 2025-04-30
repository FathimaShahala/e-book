const mongoose = require("mongoose");

mongoose
  // .connect("mongodb://127.0.0.1:27017/book")
  .connect(process.env.MONGODB_DEV)

  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(e => {
    console.log(e);

    console.log("DB CONNECTION FAILED");
  });
module.exports = mongoose;
