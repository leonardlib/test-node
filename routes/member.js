const { Member } = require('../data/models/member');

const getMembers = async (req, res) => {
    try {
        const data = await Member.findAll();
        res.json(data);
    } catch (e) {
        res.send(e);
    }
};

const createMember = async (req, res) => {
    try {
        const members = await Member.findAll();
        return res.json(members);
    } catch (e) {
        return res.send(e);
    }
};

const getMember = async (req, res) => {
    try {
        const members = await Member.findAll();
        return res.json(members);
    } catch (e) {
        return res.send(e);
    }
};

const deleteMember = async (req, res) => {
    try {
        const members = await Member.findAll();
        return res.json(members);
    } catch (e) {
        return res.send(e);
    }
};

const updateMember = async (req, res) => {
    try {
        const members = await Member.findAll();
        return res.json(members);
    } catch (e) {
        return res.send(e);
    }
};

exports.getMembers = getMembers;
exports.createMember = createMember;
exports.getMember = getMember;
exports.deleteMember = deleteMember;
exports.updateMember = updateMember;
