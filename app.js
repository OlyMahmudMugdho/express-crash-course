const express = require('express');
const path = require('path');
const app = express();
const users = require('./api/users');

/* app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
}); */

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

app.put('/api/users', (req, res) => {
    users.map(
        (user) => {
            if(user.id === 11){
                user.friend = 'Mugdho Mahmud';
            }
        }
    );
    res.json({message : "Updated", users});

})


app.listen(5000);