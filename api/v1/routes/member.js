const { Member } = require('../models/member');
const { Op } = require("sequelize");

/**
 * Endpoint to list all Members in database
 * @author @leonard_lib
 * @date 2020-12-07
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getMembers = async (req, res) => {
    try {
        const text = req.query.q || null;
        const options = !text ? {} : {
            where: {
                [Op.or]: [{
                    name: {
                        [Op.substring]: text
                    }
                }, {
                    title: {
                        [Op.substring]: text
                    },
                }]
            }
        };
        const data = await Member.findAll(options);
        res.json(data);
    } catch (e) {
        res.send(e);
    }
};

/**
 * Endpoint to create a new Member
 * @author @leonard_lib
 * @date 2020-12-07
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const createMember = async (req, res) => {
    try {
        const data = await Member.create(req.body);
        res.json(data);
    } catch (e) {
        res.send(e);
    }
};

/**
 * Endpoint to get a single Member
 * @author @leonard_lib
 * @date 2020-12-07
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getMember = async (req, res) => {
    try {
        const id = req.params.id;
        const member = await Member.findByPk(id);

        if (!member) {
            return res.status(404).json({
                status: 404,
                result: 'Member not found'
            });
        }

        return res.json(member);
    } catch (e) {
        return res.send(e);
    }
};

/**
 * Endpoint to delete a single Member
 * @author @leonard_lib
 * @date 2020-12-07
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deleteMember = async (req, res) => {
    try {
        const id = req.params.id;
        const member = await Member.findByPk(id);

        if (!member) {
            return res.status(404).json({
                status: 404,
                result: 'Member not found'
            });
        }

        await member.destroy();
        return res.json({});
    } catch (e) {
        return res.send(e);
    }
};

/**
 * Endpoint to update a Member properties
 * @author @leonard_lib
 * @date 2020-12-07
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const updateMember = async (req, res) => {
    try {
        const id = req.params.id;
        const member = await Member.findByPk(id);

        if (!member) {
            return res.status(404).json({
                status: 404,
                result: 'Member not found'
            });
        }

        member.name = req.body.name;
        member.title = req.body.title;
        await member.save();

        return res.json(member);
    } catch (e) {
        return res.send(e);
    }
};

exports.getMembers = getMembers;
exports.createMember = createMember;
exports.getMember = getMember;
exports.deleteMember = deleteMember;
exports.updateMember = updateMember;
