const router = require("express").Router();
const { StatusCodes } = require("http-status-codes");

const userService = require("../users/user.service");

router.route("/").post(async (req, res) => {
  const auth = await userService.authenticate(req.body);

  res.status(StatusCodes.OK).json({
    message: "Authenticated",
    ...auth
  });
});

module.exports = router;

