const { getDBConnection } = require('../utils');
const { DataTypes } = require('sequelize');
const db = getDBConnection();

const Member = db.define('member', {
    name: DataTypes.STRING,
    title: DataTypes.STRING
});

exports.Member = Member;
