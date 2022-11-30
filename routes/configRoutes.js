const indexR = require("./index.js")
const toysR = require("./toys.js")
const foodsR = require("./foods.js")
const userR = require("./users.js")

exports.routesInit = (app) => {
    app.use("/", indexR);
    app.use("/toys", toysR);
    app.use("/foods", foodsR);
    app.use("/users", userR);
}