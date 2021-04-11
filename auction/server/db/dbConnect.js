const mongoose = require("mongoose");

async function dbConnect() {
    mongoose
    .connect(
        'mongodb+srv://jay:jaydahisar@cluster0.l6v6u.mongodb.net/participants?retryWrites=true&w=majority',
      {
        //   these are options to ensure that the connection is done properly
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    ).then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
      })
      .catch((error) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
      });
}

module.exports = dbConnect;