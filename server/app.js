const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dbError = require("debug")("app:error");
const dbDebugger = require("debug")("app:db");
const app = express();
const user = require("./routes/users");
const product = require("./routes/products");
const category = require("./routes/categories");
const owner = require("./routes/owners");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// ? connect to mongoDb-atlas..
mongoose
  .connect(process.env.Db_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => dbDebugger("Connected to database"))
  .catch((err) => dbError("Could not connect to the DataBase...!", err));

// * middleware....
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", user);
app.use("/api/products", product);
app.use("/api/categories", category);
app.use("/api/owners", owner);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
