# Project-4-URL-Shortner

run npm install<br/>
npm start<br/>
go to http://localhost:3000<br/>

Libraries used:<br/>
Express (for starting the server)<br/>
Redis (for caching)<br/>
Mongoose (ODM)<br/>
ShortID (to generate short aliases)<br/>

Overview<br/>
URL shortening is used to create shorter aliases for long URLs. We call these shortened aliases “short links.” Users are redirected to the original URL when they hit<br/>
these short links. Short links save a lot of space when displayed, printed, messaged, or tweeted. Additionally, users are less likely to mistype shorter URLs.<br/>

For example, if we shorten the following URL through TinyURL:<br/>

https://babeljs.io/blog/2020/10/15/7.12.0#class-static-blocks-12079httpsgithubcombabelbabelpull12079-12143httpsgithubcombabelbabelpull12143<br/>
We would get:<br/>

https://tinyurl.com/y4ned4ep<br/>
The shortened URL is nearly one-fifth the size of the actual URL.<br/>

Some of the use cases for URL shortening is to optimise links shared across users, easy tracking of individual links and sometimes hiding the affiliated original URLs.<br/>

Models<br/>
Url Model<br/>
{ urlCode: { mandatory, unique, lowercase, trim }, longUrl: {mandatory, valid url}, shortUrl: {mandatory, unique} }<br/>
POST /url/shorten<br/>
Create a short URL for an original url recieved in the request body.<br/>
The baseUrl must be the application's baseUrl. Example if the originalUrl is http://abc.com/user/images/name/2 then the shortened url should be <br/>http://localhost:3000/xyz
Return the shortened unique url. Refer this for the response<br/>
Ensure the same response is returned for an original url everytime<br/>
Return HTTP status 400 for an invalid request<br/>
GET /:urlCode<br/>
Redirect to the original URL corresponding<br/>
Use a valid HTTP status code meant for a redirection scenario.<br/>
Return a suitable error for a url not found<br/>
Return HTTP status 400 for an invalid request<br/>
Testing<br/>
To test these apis create a new collection in Postman named Project 4 Url Shortner<br/>
Each api should have a new request in this collection<br/>
Each request in the collection should be rightly named. Eg Url shorten, Get Url etc<br/>
Each member of each team should have their tests in running state<br/>
Phase II<br/>
Use caching while fetching the shortened url to minimize db calls.<br/>
Implement what makes sense to you and we will build understanding over the demo discussion.<br/>
Figure out if you can also use caching while redirecting to the original url from the shortedned url<br/>
Response<br/>
Successful Response structure<br/>
{<br/>
status: true,<br/>
data: {<br/>
<br/>
}<br/>
}<br/>
Error Response structure<br/>
{<br/>
status: false,<br/>
message: ""<br/>
}<br/>
Response samples<br/>
Url shorten response<br/>
{<br/>
"data": {<br/>
"longUrl": "http://www.abc.com/oneofthelongesturlseverseenbyhumans.com",<br/>
"shortUrl": "http://localhost:3000/ghfgfg",<br/>
"urlCode": "ghfgfg"<br/>
}<br/>
}
