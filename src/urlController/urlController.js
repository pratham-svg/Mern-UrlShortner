const urlModel = require("../urlModel/urlModel");
const nanoid = require("nanoid");
const errorHandler = require("../errorHandler/errorHandler");
exports.urlShortner = async (req, res) => {
  try {
    const urlCode = nanoid();
    const longUrl = req.body.longUrl;
    const shortUrl = `http://localhost:3000/${urlCode}`;
    const url = urlModel.create({ urlCode, longUrl, shortUrl });
    return res.status(201).send({ status: true, data: url });
  } catch (err) {
    return errorHandler();
  }
};

exports.urlRedirect = async (req, res) => {
  try {
    const url = urlModel.findOne({ urlCode: req.params.urlCode });
    if (!url) {
      return res.status(404).send({ status: false, message: "URL not found" });
    }
    return res.status(302).redirect(url.longUrl);
  } catch (err) {
    return errorHandler();
  }
};
