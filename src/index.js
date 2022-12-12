const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const route = require("./routes/route");
const app = express();
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err.message));
app.use("/", route);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});


