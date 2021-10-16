const express = require("express")
const app = express();
const router = require("./router")
const path = require("path")
const sessionOptions = require("./config/sessionOptions")


app.use(sessionOptions)

app.use(function (req, res, next) {
    res.locals.user = req.session.user
    next()
})

const expressEjsLayouts = require('express-ejs-layouts')

app.use(express.static("public"))
app.set("views", "views")
app.set("view engine", "ejs")
app.use(expressEjsLayouts)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', router);

app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.APP_PORT}`)
})

module.exports = app


