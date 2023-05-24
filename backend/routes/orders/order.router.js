const { StatusCodes } = require("http-status-codes");
const router = require("express").Router({ mergeParams: true });
const orderService = require("./order.service");
const { orders } = require("../../utils/validation/schemas");
const { validator } = require("../../utils/validation/validator");

router.get("/", async (req, res) => {
  const order = await orderService.get(req.userId);
  res.status(StatusCodes.OK).send(order.toResponse());
});

router.put("/", validator(orders, "body"), async (req, res) => {
  const order = await orderService.upsert(req.userId, req.body);
  res.status(StatusCodes.OK).send(order.toResponse());
});

module.exports = router;

