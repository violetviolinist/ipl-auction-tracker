var express = require('express');
var router = express.Router();
const Participant = require("../db/Participants.js");

/* GET users listing. */
router.get('/', async function(req, res, next) {
    // const Jay = await new Participant({
    //     name: "Jay (Eventual Winner)",
    //     players: [
    //         'Shubhman Gill',
    //         'Dinesh Karthik',
    //         'Suresh Rainia',
    //         'T Natarajan',
    //         'Bhuvneshwar Kumar',
    //         'Shikhar Dhawan',
    //         'Johnny Bairstow',
    //         'Pat Cummins',
    //         'Kieron Pollard',
    //         'Rashid Khan',
    //         'Abdul Samad',
    //     ],
    //     captain: 'Shikhar Dhawan',
    //     viceCaption: 'Shubman Gill',
    // });
    // const Rohan = await new Participant({
    //     name: "Rohan",
    //     players: [
    //         'Rohit Sharma',
    //         'Kane Williamson <3',
    //         'Ajinkya Rahane',
    //         'Chris Morris',
    //         'Andre Russell',
    //         'Navdeep Saini',
    //         'Devdutt Padikkal',
    //         'Imran Tahir',
    //         'Axar Patel',
    //         'Md. Azharudeen',
    //         'Kartik Tyagi'
    //     ],
    //     captain: 'Rohit Sharma',
    //     viceCaption: 'Kane Williamson',
    // });
    // const Sahil = await new Participant({
    //     name: "Sahil",
    //     players: [
    //         'Mohammed Shami',
    //         'Yuzvendra Chahal',
    //         'Shivam Dube',
    //         'Hardik Pandya',
    //         'Ambati Rayudu',
    //         'Murugan Ashwin',
    //         'Jason Roy',
    //         'Abraham Benjamin De Villiers <3',
    //         'Quinton De Kock',
    //         'Trent Boult',
    //         'Wridhiman Saha',
    //     ],
    //     captain: 'Quinton De Kock',
    //     viceCaption: 'Abraham Benjamin De Villiers <3',
    // });
    // const Mohit = await new Participant({
    //     name: "Mohit",
    //     players: [
    //         'Ravichandran Ashwin',
    //         'Sanju Samson',
    //         'Nitish Rana',
    //         'Ravindra Jadeja',
    //         'Mayank Agarwal',
    //         'MS Dhoni LOL LOL LOL',
    //         'Marcus Stoinis',
    //         'Dwayne Bravo',
    //         'Anrich Nortje',
    //         'Suryakumar Yadav <3',
    //         'Kagiso Rabada',
    //     ],
    //     captain: 'Suryakumar Yadav <3',
    //     viceCaption: 'Marcus Stoinis',
    // });
    // const Siddharth = await new Participant({
    //     name: "Siddharth",
    //     players: [
    //         'Ishan Kishan <3',
    //         'Manish Pandey',
    //         'Sandeep Sharma',
    //         'Ravi Bishnoi',
    //         'Rishabh Pant',
    //         'Rahul Tewatia',
    //         'Steven Smith',
    //         'Ben Stokes',
    //         'Jos Buttler',
    //         'Prasidh Krishna',
    //         'Jason Holder <3'
    //     ],
    //     captain: 'Shikhar Dhawan',
    //     viceCaption: 'Shubman Gill',
    // });
    // const Jayant = await new Participant({
    //     name: "Jayant",
    //     players: [
    //         'Jasprit Bumrah',
    //         'KL Rahul',
    //         'Shardul Thakur',
    //         'Rahul Chahar',
    //         'Washington Sundar',
    //         'Eoin Morgan',
    //         'Faf Du Plessis',
    //         'Nathan Coulter Nile',
    //         'Dawid Malan',
    //         'Krunal Pandya',
    //         'Rahul Tripathi',
    //     ],
    //     captain: 'KL Rahul',
    //     viceCaption: 'Jasprit Bumrah',
    // });
    // const Gaurav = await new Participant({
    //     name: "Gaurav",
    //     players: [
    //         'Mohammed Siraj',
    //         'Varun Chakroborty',
    //         'Virat Kohli',
    //         'Prithvi Shaw',
    //         'David Warner',
    //         'Deepak Chahar',
    //         'Ruturaj Gaikwad',
    //         'Glenn Maxwell',
    //         'Nicolas Pooran',
    //         'Sam Curran',
    //         'Shreyas Gopal'
    //     ],
    //     captain: 'Virat Kohli',
    //     viceCaption: 'David Warner',
    // });
    // await Jay.save();
    // await Gaurav.save();
    // await Mohit.save();
    // await Sahil.save();
    // await Jayant.save();
    // await Siddharth.save();
    // await Rohan.save();
    const list = await Participant.find();
    list.sort((a, b) => {
        if(typeof a.points === 'undefined' || typeof b.points === 'undefined') {
            return 0;
        }
        return a.points = b.points;
    });
    res.send(list);
});

module.exports = router;
