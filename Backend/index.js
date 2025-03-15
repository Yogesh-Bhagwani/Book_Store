const express = require("express");
const app = express();
const { PORT, mongoDBURL } = require("./config");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/bookModel");
const booksRouter = require("./routes/booksRoute");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "https://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use("/books", booksRouter);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((err) => {
    console.log(err);
  });
