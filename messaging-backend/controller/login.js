const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserData = require("../model/UserSignupData");

exports.PostLoginData = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password is required." });
  }

  if (!email) {
    return res.status(400).json({ msg: "Email is required." });
  }
  if (!password) {
    return res.status(400).json({ msg: "Password is required." });
  }
  UserData.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: "Email or password is incorrect." });
      } else {
        bcrypt.compare(password, user.password).then((doMatch) => {
          if (!doMatch) {
            return res
              .status(400)
              .json({ msg: "Email or password is incorrect." });
          }
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
          UserData.findById(user._id).then((user) => {
              res.json({ token, user: { id: user._id, displayname: user.name } });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
