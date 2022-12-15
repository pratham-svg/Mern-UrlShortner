const urlModel = require("../urlModel/urlModel");
const shortid = require("shortid");
const ErrorHandler = require("../errorHandler/ErrorHandlerClass");
const { SET_ASYNC, GET_ASYNC } = require("../redisCache/redis");

exports.urlShortner = async (req, res, next) => {
  const longUrl = req.body.longUrl;
  const urlExist = await urlModel.findOne({ longUrl });
  if (urlExist) {
    return res.status(200).send({ status: true, data: urlExist });
  }
  const urlCode = shortid.generate();
  const shortUrl = `http://localhost:3000/${urlCode}`;
  const url = await urlModel.create({ urlCode, longUrl, shortUrl });
  return res.status(201).send({ status: true, data: url });
};

exports.urlRedirect = async (req, res, next) => {
  const cachedUrl = await GET_ASYNC(`${req.params.urlCode}`);
  if (cachedUrl) {
    return res.status(302).redirect(JSON.parse(cachedUrl).longUrl);
  }
  const url = await urlModel.findOne({ urlCode: req.params.urlCode });
  if (!url) {
    return next(new ErrorHandler(404, "URL not found"));
  }
  await SET_ASYNC(`${req.params.urlCode}`, JSON.stringify(url));
  return res.status(302).redirect(url.longUrl);
};
