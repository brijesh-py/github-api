const { Router } = require("express");
const {
  handleAuth,
  handleCallback,
  handleGetUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/protectMiddleware");

const router = Router();

router.get("/login", handleAuth);
router.get("/callback", handleCallback);
router.get("/user", protect, handleGetUser);

module.exports = router;
