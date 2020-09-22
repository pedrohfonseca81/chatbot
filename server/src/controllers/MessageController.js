const message = require("../models/message");
const parseAnswer = require("../utils/parseAnswer");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  sendMessage(req, res) {
    const { content } = req.body;
    const { authorization } = req.headers;
    const user = jwt.decode(authorization);

    User.findOne({ _id: user.id }, (err, doc) => {
      if (!doc) return res.status(401).send();
    });

    message.findOne({ content: parseAnswer(content) }, (err, doc) => {
      if (!doc) {
        return res.json({
          valid: false,
          message:
            'This answer does not exist in our database, <a href="/create">send here</a>',
        });
      };
      res.json({ valid: true, message: doc.reply });
    });
  },
  create(req, res) {
    const { answer, reply } = req.body;
    const { authorization } = req.headers;
    const user = jwt.decode(authorization);

    User.findOne({ _id: user.id }, (err, doc) => {
      if (!doc) return res.status(401).send();
    });

    message.findOne({ content: parseAnswer(answer) }, (err, doc) => {
      if (doc)
        return res.status(401).json({ message: "This answer already exists." });

      const Message = new message({
        content: parseAnswer(answer),
        reply,
        date: Date.now(),
      });

      Message.save();

      res.json({ message: "Success!" });
    });
  },
};
