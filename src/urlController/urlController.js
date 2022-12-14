const urlModel = require("../urlModel/urlModel");
const shortid = require("shortid");
const errorHandler = require("../errorHandler/errorHandler");
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
    let cachedUrl = await GET_ASYNC(`${req.params.urlCode}`);
    if (cachedUrl) {
      return res.status(302).send({ status: true, data: cachedUrl });
    }
    const url = await urlModel.findOne({ urlCode: req.params.urlCode });
    if (!url) {
      return res.status(404).send({ status: false, message: "URL not found" });
    }
    await SET_ASYNC(`${req.params.urlCode}`, JSON.stringify(url));
    return res.status(302).redirect(url.longUrl);
  } catch (err) {
    return errorHandler(err, res);
  }
};
