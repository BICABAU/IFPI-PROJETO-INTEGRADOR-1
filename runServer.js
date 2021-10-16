require("dotenv").config
const express = require("express")
const app = require('./app');

app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.APP_PORT}`)
})