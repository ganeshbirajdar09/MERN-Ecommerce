//Imports
require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser"); // deprecated
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes (Controllers)
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");
const paymentBRoutes = require("./routes/paymentBRoutes");

const app = express();

//DB Connecting
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("DB GOT OOPSS....");
  });

//Middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors());
// app.use(bodyParser.json())

//My Routes (Routes)
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", paymentBRoutes);

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is up and running at ${port}`);
});
