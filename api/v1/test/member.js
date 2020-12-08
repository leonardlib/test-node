const chai = require('chai');
const chaiHttp = require('chai-http');
const { Member } = require('../models/member');
const server = require('../../../index');

// Init chai
chai.use(chaiHttp);
chai.should();

/**
 * Wait for server to be 'ready'
 * @author @leonard_lib
 * @date 2020-12-07
 */
before(done => {
    server.on('ready', () => {
        done();
    });
});

/**
 * Tests for Members endpoints
 * @author @leonard_lib
 * @date 2020-12-07
 */
describe('Members', () => {
    // Clear table before every test
    beforeEach(async () => {
        await Member.destroy({ truncate: true });
    });

    /**
     * Test for list all Members endpoint
     * @author @leonard_lib
     * @date 2020-12-07
     */
    describe('/GET members', () => {
        it('should get all members', done => {
            chai.request(server)
                .get('/api/v1/members')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST members', () => {
        /**
         * Test for create new Member endpoint if a name is not provided
         * @author @leonard_lib
         * @date 2020-12-07
         */
        it('should not create a member without name', done => {
            const member = {
                'title': 'Developer'
            };
            chai.request(server)
                .post('/api/v1/members')
                .send(member)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('result');
                    done();
                });
        });

        /**
         * Test for create new Member endpoint if all data is filled
         * @author @leonard_lib
         * @date 2020-12-07
         */
        it('should create a member', done => {
            const member = {
                'name': 'Leonardo',
                'title': 'Developer'
            };
            chai.request(server)
                .post('/api/v1/members')
                .send(member)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('Leonardo');
                    res.body.should.have.property('title').eql('Developer');
                    done();
                });
        });
    });

    /**
     * Test for get Member information by ID endpoint
     * @author @leonard_lib
     * @date 2020-12-07
     */
    describe('/GET/:id members', () => {
        it('should get a member by id', async () => {
            const member = await Member.create({
                'name': 'Leonardo',
                'title': 'Developer'
            });
            const res = await chai.request(server).get(`/api/v1/members/${member.id}`);

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name').eql('Leonardo');
            res.body.should.have.property('title').eql('Developer');
        });
    });

    /**
     * Test for update a Member endpoint
     * @author @leonard_lib
     * @date 2020-12-07
     */
    describe('/PUT/:id members', () => {
        it('should update a member by id', async () => {
            const member = await Member.create({
                'name': 'Leonardo',
                'title': 'Developer'
            });
            const res = await chai.request(server)
                .put(`/api/v1/members/${member.id}`)
                .send({
                    'name': 'Jorge',
                    'title': 'Communications'
                });

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name').eql('Jorge');
            res.body.should.have.property('title').eql('Communications');
        });
    });

    /**
     * Test for delete a Member endpoint
     * @author @leonard_lib
     * @date 2020-12-07
     */
    describe('/DELETE/:id members', () => {
        it('should delete a member by id', async () => {
            const member = await Member.create({
                'name': 'Leonardo',
                'title': 'Developer'
            });
            const res = await chai.request(server).delete(`/api/v1/members/${member.id}`);

            res.should.have.status(200);
            res.body.should.be.a('object');
        });
    });
});
