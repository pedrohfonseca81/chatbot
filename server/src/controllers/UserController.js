const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  fetch(req, res) {
    const { authorization } = req.headers;
    const user = jwt.decode(authorization);

    User.findOne({ _id: user.id }, (err, doc) => {
      if(!doc) return res.status(404).end();

      res.json({ username: doc.username });
    });
  },
};
