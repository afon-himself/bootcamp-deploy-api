const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/User');

mongoose.connect('mongodb+srv://ivan:12345@cluster.tmxtz.mongodb.net/deployapp?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.once('open', () => {
    console.log('DB connected');
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/users', (req, res) => {
    User.find({})
    .then((users) => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

app.post('/api/users', (req, res) => {
    const { name, age } = req.body;
    const user = new User({ name, age });
    user.save()
    .then(() => {
        res.status(201).send();
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running');
})