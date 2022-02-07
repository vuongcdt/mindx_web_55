const express = require("express");
const AuthCtrl = require("../controllers/AuthController");
const router = express.Router();

router.post("/login", async (req, res) => {
  //TODO: validation
  //call logic
  try {
    const loginInfo = await AuthCtrl.login(
      req.body.username,
      req.body.password
    );
    res.json(loginInfo);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.post("/register", async (req, res) => {
  //validation kiem tra du lieu
  console.log('b');
  if (!req.body.password || req.body.password.length < 6) {
    res.status(400).send("Password must contain at least 6 characters");
    return;
  }
  // Call logic
  try {
    const newUser = await AuthCtrl.register(
      req.body.username,
      req.body.email,
      req.body.password
    );
    console.log("newUser:",newUser); 
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.status(409).send(err.message);
  }
});

module.exports = router;
