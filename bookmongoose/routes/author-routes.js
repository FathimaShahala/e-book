const express = require("express");
const Author = require("../db/models/author-schema");

const router = express.Router();

//POST
router.post("/author", async (req, res) => {
  try {
    const { body } = req;
    const response = await Author.create(body);
    return res
      .status(201)
      .json({ success: true, message: "Author Added", data: response });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

//GET
router.get("/author", async (req, res) => {
  try {
    // const {
    //   title,
    //   author,
    //   genre,
    //   discription,
    //   price,
    //   sortby = "title",
    //   sortorder = "asc",
    //   page = 1,
    // } = req.query;
    const response = await Author.find();
    // .sort({ [sortby]: sortorder })
    // .limit(2)
    // .skip((page - 1) * 2);
    return res.status(200).json({ success: true, data: response });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

//GET by ID
router.get("/author/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Author.findById(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

//DELETE
router.delete("/author/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Author.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: `Author with ${id} deleted`, data: response });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

//UPDATE
router.patch("/author/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await Author.findByIdAndUpdate(id, body);
    return res
      .status(200)
      .json({ message: `Author with ${id} updated`, data: response });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

module.exports = router;
