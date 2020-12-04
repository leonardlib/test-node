const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');

const port = 3000

const data = [
    {
        "id": 1,
        "name": "Clara",
        "title": "Mother"
    },
    {
        "id": 2,
        "name": "Roberth",
        "title": "Father"
    },
    {
        "id": 3,
        "name": "Roberth Jr",
        "title": "Son"
    },
    {
        "id": 4,
        "name": "Clara Jr",
        "title": "Daughter"
    },
    {
        "id": 5,
        "name": "Angela",
        "title": "Daughter"
    },
    {
        "id": 6,
        "name": "James Jr",
        "title": "Son"
    },
    {
        "id": 7,
        "name": "James",
        "title": "Father"
    },
    {
        "id": 8,
        "name": "Sam",
        "title": "Father"
    },
    {
        "id": 9,
        "name": "Sam Jr",
        "title": "Son"
    },
    {
        "id": 10,
        "name": "Deborah",
        "title": "Daughter"
    }
];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/v1/members', (req, res) => {
    const text = req.query.q;
    const new_data = data.filter(m => m.name.toLowerCase().includes(text.toLowerCase()));
    res.json(new_data);
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
