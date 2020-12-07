const config = require('config');
const {
    Sequelize
} = require('sequelize');
let connection = null;

const getDBConnectionV1 = () => {
    if (!connection) {
        connection = new Sequelize({
            dialect: "sqlite",
            storage: config.DB_PATH
        });
    }

    return connection;
};

const checkParamPresent = (params, param) => {
    return params.includes(param.key);
};

const checkParamType = (reqParam, paramObj) => {
    const reqParamType = typeof reqParam;
    return reqParamType === paramObj.type;
};

const runValidators = (reqParam, paramObj) => {
    for (let validator of paramObj.validators) {
        if (!validator(reqParam)) {
            return false;
        }
    }

    return true;
};

const validateParams = params => {
    return (req, res, next) => {
        for (let param of params) {
            if (checkParamPresent(Object.keys(req.body), param)) {
                let reqParam = req.body[param.key];
                if (!checkParamType(reqParam, param)) {
                    return res.status(400).json({
                        status: 400,
                        result: `${param.key} is of type ` +
                            `${typeof reqParam} but should be ${param.type}`
                    });
                } else {
                    if (!runValidators(reqParam, param)) {
                        return res.status(400).json({
                            status: 400,
                            result: `Validation failed for ${param.key}`
                        });
                    }
                }
            } else if (param.required) {
                return res.status(400).json({
                    status: 400,
                    result: `Missing Parameter ${param.key}`
                });
            }
        }

        next();
    }
};

exports.getDBConnectionV1 = getDBConnectionV1;
exports.validateParams = validateParams;
