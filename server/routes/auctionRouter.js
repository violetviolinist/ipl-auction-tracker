var express = require('express');
var router = express.Router();
const Participant = require("../db/Participants.js");
const Player = require('../db/Players.js');

/* GET users listing. */
router.get('/rankList', async function(req, res, next) {
    let list = await Participant.find();
    list.sort((a, b) => {
        if(typeof a.toObject().score === 'undefined' || typeof b.toObject().score === 'undefined') {
            return 0;
        }
        return b.toObject().score - a.toObject().score;
    });
    res.send(list);
});

router.get('/players', async (req, res, next) => {
    const players = await Player.find();
    res.send(players);
});

// router.post('/setTeams', async (req, res, next) => {
//     const { players, team } = req.body;
//     players.forEach(async (player) => {
//         await Player.updateOne({'name': player}, {
//             '$set': { team },
//         });
//     });
//     res.end();
// });

router.post('/updateScores', async (req, res, next) => {
    const { pointsInfo, password } = req.body;

    if(Buffer.from(password).toString('base64') !== 'd293') {
        res.end('error');
        next();
    } else {
        Object.keys(pointsInfo).forEach(async (player) => {
            await Player.updateOne({'name': player}, {
                '$inc': { score: Number(pointsInfo[player]) },
            });
        });

        const list = await Participant.find();
        list.forEach( async (participant) => {
            let totalIncrement = 0;
            participant.toObject().players.forEach(player => {
                if(pointsInfo[player]) {
                    let multiplier = 1;
                    if(participant.toObject().captain === player) {
                        multiplier = 2;
                    } else if(participant.toObject().viceCaption === player) {
                        multiplier = 1.5;
                    }
                    totalIncrement += multiplier * Number(pointsInfo[player]);
                }
            });
            await Participant.updateOne({ name: participant.toObject().name }, {
                $inc: { score: totalIncrement },
            });
        });

        res.end();
    }
});

module.exports = router;
