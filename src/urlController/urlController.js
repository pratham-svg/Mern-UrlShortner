const urlModel = require("../urlModel/urlModel");
const shortid = require("shortid");
const errorHandler = require("../errorHandler/errorHandler");
exports.urlShortner = async (req, res) => {
  try {
    const longUrl = req.body.longUrl;
    const urlExist = await urlModel.findOne({ longUrl });
    if (urlExist) {
      return res.status(200).send({ status: true, data: urlExist });
    }
    const urlCode = shortid.generate();
    const shortUrl = `http://localhost:3000/${urlCode}`;
    const url = await urlModel.create({ urlCode, longUrl, shortUrl });
    return res.status(201).send({ status: true, data: url });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.urlRedirect = async (req, res) => {
  try {
    const url = await urlModel.findOne({ urlCode: req.params.urlCode });
    if (!url) {
      return res.status(404).send({ status: false, message: "URL not found" });
    }
    return res.status(302).redirect(url.longUrl);
  } catch (err) {
    return errorHandler(err, res);
  }
};
