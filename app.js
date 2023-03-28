const express = require('express');
const path = require('path');

const users = require('./api/users');
const moment = require('moment');
const { engine } = require('express-handlebars');


/* app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
}); */

const app = express();

app.engine('.hbs', engine({ extname : '.hbs' }));
app.set('view engine','.hbs');
app.set('views','./views');


app.get('/', (req, res) => {
    res.render('index',{
        title : "Mugdho"
    })
})


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



app.listen(5000);