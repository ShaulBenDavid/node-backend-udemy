const express = require("express");
const User = require("../models/user");
const isAuth = require("../middleware/is-auth");
const authController = require("../controllers/auth");
const { body } = require("express-validator");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("email is already exist");
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password as to be at leaast 5 characters")
      .trim()
      .isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);

router.get("/status", isAuth, authController.getUserStatus);

router.patch(
  "/status",
  isAuth,
  [body("status").trim().not().isEmpty()],
  authController.updateUserStatus
);

module.exports = router;
