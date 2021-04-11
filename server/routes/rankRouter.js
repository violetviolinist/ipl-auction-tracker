var express = require('express');
var router = express.Router();
const Participant = require("../db/Participants.js");
const Player = require('../db/Players.js');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let list = await Participant.find();
    list.sort((a, b) => {
        if(typeof a.points === 'undefined' || typeof b.points === 'undefined') {
            return 0;
        }
        return a.points - b.points;
    });

    // await Player.deleteMany();
    // list.forEach(participant => {
    //     const localPlayers = participant.toObject().players.map(async (player) => {
    //          await new Player({
    //             name: player,
    //             score: 0,
    //         }).save();
    //     });
    // });
    // res.render('rankList', { rankList: list.map(participant => participant.toObject()) });
    res.send(list);
});

module.exports = router;
