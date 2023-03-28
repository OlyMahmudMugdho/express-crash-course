const express = require('express');
const path = require('path');
const app = express();
const users = require('./api/users');
const moment = require('moment');


/* app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
}); */

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.hostname}:500${req.url}  ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
    next();
}
app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/users', (req, res) => {
    res.json(users);
})

const new_user = {
    id: 11,
    name: "Mila",
    friend: "Mugdho M"
}
app.post('/api/users', (req, res) => {
    users.push(new_user);
    res.json(users);
})

app.put('/api/users/:id', (req, res) => {
    users.map(
        (user) => {
            if (user.id === parseInt(req.params.id)) {
                user.friend = 'Mugdho Mahmud';
            }
        }
    );
    res.json({ message: "Updated", users });

})
app.delete('/api/users/:id', (req, res) => {

    const cpUsers = users.filter(
        (user) =>
            user.id !== parseInt(req.params.id)
    )
    res.json(cpUsers);
})

const nums = [1, 87, 6, 23, 7];
console.log(nums.filter(
    (num) => num > 10
))

app.listen(5000);