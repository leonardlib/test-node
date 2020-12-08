const { getDBConnection, validateParams } = require('./api/utils');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001;

// Routes
const members = require('./api/v1/routes/member');
const { MemberParams } = require("./api/v1/models/member");

// DB connection
const db = getDBConnection();

(async () => {
    // DB initialization
    await db.sync({ alter: true });

    // Server initialization
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: 'application/json' }));

    // Index route
    app.get('/', (req, res) => {
        res.json({
            message: 'Testing a Node JS API'
        });
    });

    // Routers
    const router = express.Router();

    // API V1
    router.route('/members')
        .get(members.getMembers)
        .post(
            validateParams(MemberParams),
            members.createMember,
        );
    router.route('/members/:id')
        .get(members.getMember)
        .delete(members.deleteMember)
        .put(
            validateParams(MemberParams),
            members.updateMember,
        );

    // Launch server
    app.use('/api/v1', router);
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`)
    })
})();
