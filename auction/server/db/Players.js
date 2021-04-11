const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({}, {strict: false});

module.exports = mongoose.model("Players", PlayerSchema);
