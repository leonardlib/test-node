const { getDBConnectionV1 } = require('../../utils');
const { DataTypes } = require('sequelize');
const db = getDBConnectionV1();

const MemberParamsV1 = [{
    key: 'name',
    required: true,
    type: 'string',
    validators: [
        param => param.length > 0
    ]
}, {
    key: 'title',
    required: true,
    type: 'string',
    validators: [
        param => param.length > 0
    ]
}];

const Member = db.define('member', {
    name: DataTypes.STRING,
    title: DataTypes.STRING
});

exports.MemberParamsV1 = MemberParamsV1;
exports.Member = Member;
