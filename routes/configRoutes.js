const indexR = require("./index.js")
const toysR = require("./toys.js")
const userR = require("./users.js")

exports.routesInit = (app) => {
    app.use("/", indexR);
    app.use("/toys", toysR);
    app.use("/users", userR);
}