const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  signIn(req, res) {
    const { username, password } = req.body;

    User.findOne({ $and: [{ username }, { password }] }, (err, doc) => {
      if (!doc) return res.status(401).json({ message: "Invalid user" });

      const token = jwt.sign(
        { id: doc.id, username: doc.username },
        process.env.PRIVATE_KEY
      );

      res.setHeader("Authorization", token);
      res.send();
    });
  },
  signUp(req, res) {
    const { username, password } = req.body;

    User.findOne({ username }, async (err, doc) => {
      if (doc)
        return res
          .status(401)
          .json({ message: "This account already is registered." });

      const user = new User({
        username,
        password,
        date: Date.now(),
      });

      await user.save();

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.PRIVATE_KEY
      );

      res.setHeader("Authorization", token);
      res.send();
    });
  },
};
