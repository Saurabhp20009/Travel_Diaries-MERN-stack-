const express = require("express");
const { userRouter } = require("./Routes/UserRoutes");
const { postRouter } = require("./Routes/PostRoutes");
const app = express();
const cors= require('cors')
require("./config/connection");

app.use(cors())
app.use(express.json());
app.use("/user/api", userRouter);
app.use("/post/api", postRouter);
app.listen(5000, () => {
  console.log("PORT IS RUNNING");
});
