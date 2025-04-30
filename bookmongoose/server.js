const express = require("express");

const dontenv = require("dotenv");
dontenv.config("./.env");

const db = require("./db");
const bookRoutes = require("./routes/book-routes");
const authorRoutes = require("./routes/author-routes");
const imageRoutes = require("./routes/image-routes");
const adminRoutes = require("./routes/admin-routes");
const userRoutes = require("./routes/user-routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(bookRoutes);
app.use(authorRoutes);
app.use(imageRoutes);
app.use(adminRoutes);
app.use(userRoutes);

app.listen(process.env.PORT, () => {
  console.log("app is running");
});
