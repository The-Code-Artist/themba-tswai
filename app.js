const express = require("express");
const request = require("request");

require("dotenv").config();

const secret = process.env.G_RECAPTCHA_SECRET;

// Create an instance of an Express.js application.
const app = express();

// Middleware configuration.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/img", express.static(`${__dirname}/public/img`));
app.use("/js", express.static(`${__dirname}/public/js`));

// Core app configuration.
app.set("views", `${__dirname}/src/views`);
app.set("view engine", "ejs");

// The app.HTTP_REQUEST_METHOD functions are used to define routes and handle HTTP requests.
app.get("/", (req, res) => {
    res.render("index");
});

// Initiate the HTTP server and let it listen to any port desired.
app.listen(3000, () => {
    console.info("The web app has started and is listening at port: 3000.");
});
