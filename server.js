require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const authRoute = require("./router/auth-router");
const foodRoute = require("./router/food-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT,DELETE,PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/food", foodRoute);

//Admin route

app.use("/api/admin", adminRoute);

// app.get("/", (req, res) => {
//   res.status(200).send("atlas backend");
// });
// app.get("/register", (req, res) => {
//   res.status(200).send("atlas admin register");
// });

app.use(errorMiddleware);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
