const bcrypt = require("bcrypt");
const UserData = require("../model/UserSignupData");

exports.GetSignupData = (req, res) => {
  const name = req.body.name;
  const gender = req.body.gender;
  const email = req.body.email;
  const password = req.body.password;

  if (!name) return res.status(400).json({ msg: "Name is required." });
  if (!gender) return res.status(400).json({ msg: "Gender is required." });
  if (!email) return res.status(400).json({ msg: "Email is required." });
  if (!password) return res.status(400).json({ msg: "Password is required." });
  if(password.length < 5) return res.status(400).json({ msg: "Password length should be greater than 5" })

  UserData.findOne({ email: email }).then((user) => {
    if (user) {
     return res.status(400).json({ msg :"Email already registered."});
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new UserData({
          name: name,
          gender: gender,
          email: email,
          password: hashedPassword,
        });
        user.save().then((result) => {
          res.status(200).json({ msg: "saved" });
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
};
