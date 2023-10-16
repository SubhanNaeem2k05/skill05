const { recruiterSignUp } = require("../model/recruiterModel");
const { defineAdmin } = require("../model/adminModel");
const jwt = require("jsonwebtoken");
const secertKey =
  "192b9bdd22ab9ed4d12e236c78afcb9a393ec15f71bbf5dc987d54727823bcbf";
exports.GetRecuriter = async (req, res) => {
  await recruiterSignUp
    .findAll({ where: { check: "0" } })
    .then((data) => {
      const jsonData = data.map((item) => item.toJSON());
      res.status(200).json(jsonData);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred while fetching data." });
      console.log("error", error);
    });
};
exports.UpdateRecuriter = async (req, res) => {
  const id = req.body.uid;
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, secertKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
    });
    const user = await recruiterSignUp.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.check = "1";
    await user.save();
    await recruiterSignUp.findAll({ where: { check: "0" } }).then((data) => {
      const jsonData = data.map((item) => item.toJSON());
      res.status(200).json(jsonData);
    });
  } catch (error) {
    console.error("Error updating username:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.AdminLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log("userEmail", email);
    const user = await defineAdmin.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Password Invalid" });
    }

    const token = jwt.sign({ userId: user.id }, secertKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
