const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");

//Route for save book
router
  .route("/")
  .post(async (req, res) => {
    let data = req.body;
    try {
      if (!data.title || !data.author || !data.publishYear) {
        return res.status(400).send({
          message: "Send all require fields :title,author,publishYear",
        });
      }

      const book = await Book.create({
        title: data.title,
        author: data.author,
        publishYear: data.publishYear,
      });

      return res.status(201).send(book);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  })
  // Route for Get All Books from database
  .get(async (req, res) => {
    try {
      const books = await Book.find({});

      return res.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });
  
// Route for Get All Books from database
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);

      return res.status(200).json(book);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  })

  //Route for save book
  .put(async (req, res) => {
    let data = req.body;
    try {
      if (!data.title || !data.author || !data.publishYear) {
        return res.status(400).send({
          message: "Send all require fields :title,author,publishYear",
        });
      }

      const { id } = req.params;

      const result = await Book.findByIdAndUpdate(id, req.body);

      if (!result) {
        return res.status(404).json({ message: "Book not found" });
      }

      return res.status(200).json({ message: "Book updated successfully" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Book.findByIdAndDelete(id);

      if (!result) {
        return res.status(404).json({ message: "Book not found" });
      }

      return res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });

module.exports = router;
