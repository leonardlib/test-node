const { getDBConnectionV1, validateParams } = require('./api/utils');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001;

// Routes
const membersV1 = require('./api/v1/routes/member');
const { MemberParamsV1 } = require("./api/v1/models/member");

// DB connection
const dbV1 = getDBConnectionV1();

(async () => {
    // DB initialization
    await dbV1.sync();

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
    const routerV1 = express.Router();

    // API V1
    routerV1.route('/members')
        .get(membersV1.getMembers)
        .post(validateParams(MemberParamsV1), membersV1.createMember);
    routerV1.route('/members/:id')
        .get(membersV1.getMember)
        .delete(membersV1.deleteMember)
        .put(membersV1.updateMember);

    // Launch server
    app.use('/api/v1', routerV1);
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`)
    })
})();
