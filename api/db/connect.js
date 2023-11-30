const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require("mongodb");


// Mongoose
const connectDB = (uri) => {
    // mongoose.createConnection(uri)
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}

// Mongo
// const connectDB = (uri) => {
//     new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
// }

module.exports = connectDB