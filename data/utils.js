const config = require('config');
const {
    Sequelize
} = require('sequelize');

const getDBConnection = () => {
    return new Sequelize({
        dialect: "sqlite",
        storage: config.DB_PATH
    });
};

exports.getDBConnection = getDBConnection;
