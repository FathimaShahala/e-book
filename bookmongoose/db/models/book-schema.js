const { Schema, model } = require("mongoose");

const bookSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "authors",
  },
  genre: {
    type: String,
    required: true,
    enum: ["Science", "Fiction", "Dystopian", "Fantacy"],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const Book = model("books", bookSchema);
module.exports = Book;
