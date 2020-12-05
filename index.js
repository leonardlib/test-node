const { getDBConnection } = require('./data/utils');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001;

// Routes
const members = require('./routes/member');

// DB connection
const db = getDBConnection();

(async () => {
    // DB initialization
    await db.sync({ force: true });

    // Server initialization
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: 'application/json' }));

    app.get('/', (req, res) => {
        res.json({
            message: 'Testing a Node JS API'
        });
    });

    app.route('/members')
        .get(members.getMembers)
        // .post(members.createMember);

    /*
    app.route('/members/:id')
        .get(members.getMember)
        .delete(members.deleteMember)
        .put(members.updateMember);

    /*
    app.get('/api/v1/members', (req, res) => {
        const text = req.query.q;
        const new_data = data.filter(m => m.name.toLowerCase().includes(text.toLowerCase()));
        res.json(new_data);
    })
    */

    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`)
    })
})();
