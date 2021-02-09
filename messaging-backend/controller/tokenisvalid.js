const UserData = require("../model/UserSignupData");
const jwt = require('jsonwebtoken')

exports.TokenIsValid = async (req, res) => {
  try {
    
    const token = req.header("x-auth-token")
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await UserData.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.Home = async (req, res) => {
  const user = await UserData.findById(req.user);
  res.json({ id: user._id, displayname: user.name });
};
