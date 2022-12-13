const mongoose = require("mongoose");
const validator = require("validator");
const urlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  longUrl: {
    type: String,
    required: [true, "Please provide the URL"],
    validate: [validator.isURL, "Please provide a valid URL"],
  },
  shortUrl: { type: String, required: true, unique: true },
});
const urlModel = mongoose.model("ShortenedUrl", urlSchema);
module.exports = urlModel;
