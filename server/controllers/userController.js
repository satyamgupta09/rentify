const bcrypt = require("bcrypt");
const User = require("../model/User");
const { GenerateToken } = require("../middlewares.js/authmiddleware");
const nodeMailer = require("../middlewares.js/nodeMailer");

exports.register = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, role } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      passwordHash,
      role,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Error registering user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const role = user.role;
    const id = user.id;

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const token = GenerateToken({ email, role, id });
      res.json({ token, role });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error logging in user" });
  }
};

exports.sendEmail = async (req, res) => {
  const uid = req.userData.id;
  const user = await User.findById(uid);
  const uemail = user.email;
  const uname = user.firstName + " " + user.lastName;
  const umobile = user.phoneNumber;

  try {
    await nodeMailer.SendToSeller(req.body.semail, "OTP_PLACEHOLDER");
    await nodeMailer.SendToUSer(
      uemail,
      req.body.sname,
      req.body.smobile,
      req.body.semail
    );
    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error in sending email" });
  }
};
