const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({}, {strict: false});

module.exports = mongoose.model("Participants", ParticipantSchema);
