const { connect } = require("mongoose");

module.exports = (token) => {
    return connect(token, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
};