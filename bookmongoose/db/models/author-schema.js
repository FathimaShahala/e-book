// duplication ozhivakan author id vech eddukan

const { Schema, model } = require("mongoose");

const authorSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  award: {
    type: [String],
  },
  image: {
    type: String,
  },
});

const Author = model("authors", authorSchema);
module.exports = Author;
