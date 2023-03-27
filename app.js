const express = require('express');
const path = require('path');
const app = express();
const users = require('./api/users');

/* app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
}); */

app.use(express.static(path.join(__dirname,'public')));

app.get('/api/users',(req,res) => {
    res.json(users);
})


app.listen(5000);