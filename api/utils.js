const config = require('config');
const {
    Sequelize
} = require('sequelize');
let connection = null;

/**
 * Get the database connection instance
 * @author @leonard_lib
 * @date 2020-12-07
 * @returns {null}
 */
const getDBConnection = () => {
    if (!connection) {
        connection = new Sequelize({
            dialect: "sqlite",
            storage: config.DB_PATH
        });
    }

    return connection;
};

/**
 * Check if param is on request body params
 * @author @leonard_lib
 * @date 2020-12-07
 * @param params
 * @param param
 * @returns {*}
 */
const checkParamPresent = (params, param) => {
    return params.includes(param.key);
};

/**
 * Check if request body param type is fine
 * @author @leonard_lib
 * @date 2020-12-07
 * @param reqParam
 * @param paramObj
 * @returns {boolean}
 */
const checkParamType = (reqParam, paramObj) => {
    const reqParamType = typeof reqParam;
    return reqParamType === paramObj.type;
};

/**
 * Run request body params validations
 * @author @leonard_lib
 * @date 2020-12-07
 * @param reqParam
 * @param paramObj
 * @returns {boolean}
 */
const runValidators = (reqParam, paramObj) => {
    for (let validator of paramObj.validators) {
        if (!validator(reqParam)) {
            return false;
        }
    }

    return true;
};

/**
 * Verify request body params on endpoints
 * @author @leonard_lib
 * @date 2020-12-07
 * @param params
 * @returns {function(*, *, *): (*|undefined)}
 */
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

exports.getDBConnection = getDBConnection;
exports.validateParams = validateParams;
