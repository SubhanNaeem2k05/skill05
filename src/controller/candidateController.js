const { candidateSignUp } = require("../model/candidateModel");
const { candidateapplyjob } = require("../model/candidateModel");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
console.log(uuidv4());
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const secertKey =
  "192b9bdd22ab9ed4d12e236c78afcb9a393ec15f71bbf5dc987d54727823bcbf";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ahmadyounas2k18@gmail.com",
    pass: "rdopwhmnfkfkgybw",
  },
});
exports.getData = async (req, res) => {
  res.status(200).json({ message: "from Candidate Controller" });
};

exports.candidateapplyjob = async (req, res) => {
  console.log("DataInside");
  console.log(req.file.filename);
  const token = req.headers.authorization.split(" ")[1];
  console.log("token", token);
  jwt.verify(token, secertKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
  });

  const Name = req.body.name;
  const Email = req.body.email;
  const resume = req.file.filename;
  const phonenumber = req.body.phoneNumber;
  const education = req.body.education;
  const shortList = "0";
  const InterviewCall = "0";

  try {
    const user = await candidateapplyjob.create({
      Name,
      Email,
      resume,
      phonenumber,
      education,
      shortList,
      InterviewCall,
    });
    console.log("QWERTY");
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.candidateLogin = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const password = req.body.password;
    console.log("userEmail", userEmail);
    const user = await candidateSignUp.findOne({ where: { userEmail } });
    console.log("user", user);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (password !== user.password) {
      return res.status(401).json({ error: "Password Invalid" });
    }

    const token = jwt.sign({ userId: user.id }, secertKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.candidateSignup = async (req, res) => {
  const fullName = req.body.name;
  const userName = req.body.username;
  const userEmail = req.body.email;
  const password = req.body.password;

  const user = await candidateSignUp.findOne({ where: { userEmail } });
  if (user) {
    return res.status(409).json({ error: "credentials already Exist" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("hashedPassword", hashedPassword);
    const user = await candidateSignUp.create({
      fullName,
      userEmail,
      userName,
      password,
    });
    console.log("QWERTY");
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.forgetPassword = async (req, res) => {
  const userEmail = req.body.email;
  const user = await candidateSignUp.findOne({ where: { userEmail } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const token = jwt.sign({ email: user.userEmail }, secertKey, {
    expiresIn: "1h", // Token expires in 1 hour
  });
  const resetLink = `http://localhost:3000/resetpassword?token=${token}`;
  const mailOptions = {
    from: "ahmadyounas2k18@gmail.com",
    to: user.userEmail,
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${resetLink}`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email" });
    }
    res.status(201).json({ message: "Password reset email sent" });
  });
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    // Verify the token
    const decoded = jwt.verify(token, secertKey);
    console.log("decode", decoded);

    // Find the user by email (replace with your database query)
    const user = await candidateSignUp.find(
      (u) => u.userEmail === decoded.email
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password and update the user's password in the database
    const hashedPassword = bcrypt.hashSync(password, 10); // Use bcrypt for hashing
    // user.password = hashedPassword;

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
exports.getAllCandidate = async (req, res) => {
  const { token, password } = req.body;
  try {
    // jwt.verify(token, secertKey, (err, decoded) => {
    //   if (err) {
    //     return res.status(403).json({ message: "Token is not valid" });
    //   }
    // });

    await candidateapplyjob
      .findAll({ where: { shortList: "0" } })
      .then((data) => {
        const jsonData = data.map((item) => item.toJSON());
        res.status(200).json(jsonData);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.ShortList = async (req, res) => {
  const id = req.body.uid;
  console.log(id);
  try {
    const user = await candidateapplyjob.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.shortList = "1";
    console.log(user.shortList);
    await user.save();
    await candidateapplyjob
      .findAll({ where: { shortList: "0" } })
      .then((data) => {
        const jsonData = data.map((item) => item.toJSON());
        res.status(200).json(jsonData);
      });
  } catch (error) {
    console.error("Error updating username:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.GetShortListedCandidate = async (req, res) => {
  try {
    await candidateapplyjob
      .findAll({ where: { shortList: "1", InterviewCall: "0" } })
      .then((data) => {
        const jsonData = data.map((item) => item.toJSON());
        res.status(200).json(jsonData);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
exports.SendInvitation = async (req, res) => {
  const email = req.body.email;
  const id = req.body.id;
  const mailOptions = {
    from: "ahmadyounas2k18@gmail.com",
    to: email,
    subject: "JOB APPLICATION ",
    text: `Thanks For Applying at SKILLQ5`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email" });
    }
    res.status(201).json({ message: "Job Application Interview Email Send" });
  });
  const user = await candidateapplyjob.findByPk(id);
  user.InterviewCall = "1";
  user.save();
  await candidateapplyjob
    .findAll({ where: { InterviewCall: "0", shortList: "1" } })
    .then((data) => {
      const jsonData = data.map((item) => item.toJSON());
      res.status(200).json(jsonData);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
