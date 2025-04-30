const express = require("express");
const Book = require("../db/models/book-schema");
const checkToken = require("../middlewares/check-token");

const router = express.Router();

//POST
router.post("/book", checkToken, async (req, res) => {
  try {
    const { body } = req;
    const response = await Book.create(body);
    return res
      .status(201)
      .json({ success: true, message: "Book Added", data: response });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

//GET
router.get("/book", checkToken, async (req, res) => {
  try {
    const response = await Book.find().populate("author");
    return res.status(200).json({ success: true, data: response });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

//GET by ID
router.get("/book/:id", checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Book.findById(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

//DELETE
router.delete("/book/:id", checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Book.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: `book with ${id} deleted`, data: response });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

//UPDATE
router.patch("/book/:id", checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await Book.findByIdAndUpdate(id, body);
    return res
      .status(200)
      .json({ message: `book with ${id} updated`, data: response });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

module.exports = router;
