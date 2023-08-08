const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./db/db');
const app = express();

app.use(bodyParser.json());

//root route
app.get('/', (req, res) => {
    res.send('Hello world');
});

//GET: All users
app.get('/users', (req, res) => {
    knex
        .select()
        .from('users')
        .then((users) => {
            res.send(users);
        });
});

//GET: Users by ID
app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await knex('users').where({ id: userId }).first();
    if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found.' });
      }
});

//POST: save user
app.post('/users', (req, res) => {
    knex('users')
        .insert({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(() => {
            knex
                .select()
                .from('users')
                .then((users) => {
                    res.send(users);
                });
        });
});

//PUT: Update user
app.put('/users/:id', (req, res) => {
    knex('users')
        .where('id', ObjectId(req.params.id))
        .update({})
});

//DELETE: delete user
app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const deletedRow = await knex('users').where({ id: userId }).del();

    if (deletedRow > 0) {
      res.json({ message: 'User deleted successfully!' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
});

//port
app.listen(3000, (err) => {
    if(!err){
        console.log('running on port' + 3000);
    }
    else {
        console.error(err)
    }
})
