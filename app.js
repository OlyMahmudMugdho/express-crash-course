const express = require('express');
const router = express.Router();
const path = require('path');
const uuid = require('uuid');
const users = require('./api/users');
const moment = require('moment');
const { engine } = require('express-handlebars');
const { request } = require('http');


/* app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
}); */

const app = express();

app.engine('.hbs', engine({ extname : '.hbs' }));
app.set('view engine','.hbs');
app.set('views','./views');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.hostname}:500${req.url}  ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
    next();
}
app.use(logger);
app.get('/', (req, res) => {
    res.render('index',{
        title : "Users",
        users
    })
})


app.get('/api/users', (req, res) => {
    res.json(users);
})


app.post('/api/users', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        ...req.body
    };
    users.push(newMember);
    res.json(users);
    // return res.redirect('/'); // this line works for template rendering 
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