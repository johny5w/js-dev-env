import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// sample api call
app.get('/users', function(req, res) {
    res.json([
        {"id": 1,"firstName":"Gandalf","lastName":"The Grey","email":"gandalftg@lotr.com"},
        {"id": 2,"firstName":"Bilbo","lastName":"Baggins","email":"bbaggins@lotr.com"},
        {"id": 3,"firstName":"The","lastName":"Balrog","email":"balrog83@lotr.com"},
        {"id": 4,"firstName":"Elrond","lastName":"Lord of Rivendell","email":"elrond@lotr.com"},
        {"id": 5,"firstName":"Rhadagast","lastName":"The Brown","email":"coolwizard1@lotr.com"}
    ]);
});

app.listen(port, (err)=> {
    if (err) {
        console.log(err);
    }
    else {
        open('http://localhost:' + port);
    }
});
