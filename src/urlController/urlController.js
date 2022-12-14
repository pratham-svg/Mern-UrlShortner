const urlModel = require("../urlModel/urlModel");
const shortid = require("shortid");
const ErrorHandler = require("../errorHandler/ErrorHandlerClass");
const redis = require("redis");
const { promisify } = require("util");
const redisClient = redis.createClient(
  18986,
  "redis-18986.c212.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("YAfvnwb6Nt09XfCkCZGwbMllm7qNZzC9", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});

//2. Prepare the functions for each command

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

exports.urlShortner = async (req, res, next) => {
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
    return next(new ErrorHandler(400, err.message));
  }
};

exports.urlRedirect = async (req, res, next) => {
  try {
    let cachedUrl = await GET_ASYNC(`${req.params.urlCode}`);
    if (cachedUrl) {
      return res.status(302).redirect(JSON.parse(cachedUrl).longUrl);
    }
    const url = await urlModel.findOne({ urlCode: req.params.urlCode });
    if (!url) {
      return next(new ErrorHandler(404, "URL not found"));
    }
    await SET_ASYNC(`${req.params.urlCode}`, JSON.stringify(url));
    return res.status(302).redirect(url.longUrl);
  } catch (err) {
    return next(new ErrorHandler(400, err.message));
  }
};
