const state = require('./database');
const UITableMethods = require('./UITableMethods');
const UIMethods = new UITableMethods();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.set('trust proxy', 1)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sessions = [];
numberOfSessions = 0;

var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {  maxAge: 6000000  }
}))
 
app.post('/startSession', (req, res) => {
    if ((req.session.isExists && isNewSession(req.session) || !req.session.isExists)) { //New session
        numberOfSessions++;
        req.session.isExists = true;
        sessions.push(req.session);
        res.send({ isExists: false });
    } else {
        res.send({ isExists: true });
    }
})

function isNewSession(session) {
    sessions.forEach(key => {
        if(key.id === session.id) {
            return false;
        } else {
            return true;
        }
    })
}

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// Initiallizer
app.post('/site', (req, res) => {
    res.send({ status: 'Up and Running' });
})

// get the basic data to initiate the site
app.post('/getData', (req, res) => {
    res.send({ UITable: state.UITable, isRedTurn: state.isRedTurn, score: state.score, redScore: state.redScore, blueScore: state.blueScore })
})

// update UITable on cell-click
app.post('/updateUITable', (req, res) => {
    const obj = UIMethods.updateUITable(req.body.UITable, req.body.isRedTurn, req.body.redScore, req.body.blueScore, req.body.column, req.body.row, req.body.score)
    res.send(obj);
})

app.post('/ready', (req, res) => {
    if(numberOfSessions >= 2) {
        res.send( {isReadyToPlay: true} )
    } else {
        res.send( {isReadyToPlay: false} )
    }
})