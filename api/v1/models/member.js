const { getDBConnection } = require('../../utils');
const { DataTypes } = require('sequelize');
const db = getDBConnection();

/**
 * Params for POST and PUT requests
 * @author @leonard_lib
 * @date 2020-12-07
 */
const MemberParams = [{
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

/**
 * Member model on database
 * @author @leonard_lib
 * @date 2020-12-07
 * @type {ModelCtor<Model>}
 */
const Member = db.define('member', {
    name: DataTypes.STRING,
    title: DataTypes.STRING
});

exports.MemberParams = MemberParams;
exports.Member = Member;
