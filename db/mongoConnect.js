const mongoose = require("mongoose")

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`mongodb+srv://${config.userDB}:${config.userPass}@cluster0.qi5tkfy.mongodb.net/idf7`);
    console.log("mongo connected to atlas / idf7");
}