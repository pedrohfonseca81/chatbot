const { Router } = require("express");
const router = Router();

const MessageController = require("./controllers/MessageController");
const AuthenticationController = require("./controllers/AuthenticationController");
const UserController = require("./controllers/UserController");

/** Message */
router.post("/api/v1/send", MessageController.sendMessage);
router.post("/api/v1/create", MessageController.create);

/** Authentication */
router.post("/api/v1/auth/signup", AuthenticationController.signUp);
router.post("/api/v1/auth/signin", AuthenticationController.signIn);

/** User */

router.get("/api/v1/user/fetch", UserController.fetch);

module.exports = router;