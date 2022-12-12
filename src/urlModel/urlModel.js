const mongoose = require("mongoose");
const validator = require("validator");
const urlSchema = new mongoose.Schema({
  urlCode: { required: true, unique: true, lowercase: true, trim: true },
  longUrl: {
    required: [true, "Please provide the URL"],
    validate: [validator.isValidUrl, "Please provide a valid URL"],
  },
  shortUrl: { required: true, unique: true },
});
const urlModel = mongoose.model("ShortenedUrl", urlSchema);
module.exports = urlModel;
