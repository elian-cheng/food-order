const Orders = require("./order.model");
const { NOT_FOUND_ERROR } = require("../../errors/appErrors");

const get = async userId => {
  const orders = await Orders.find({ userId });
  if (!orders || orders.length === 0) {
    throw new NOT_FOUND_ERROR("order", `userId: ${userId}`);
  }

  return orders;
};

const save = async order => {
  try {
    return await Orders.create(order);
  } catch (err) {
    throw err;
  }
};

const upsert = async (userId, order) =>
  Orders.findOneAndUpdate({ userId }, { $set: order }, { upsert: true, new: true });

const remove = async userId => Orders.deleteOne({ userId });

module.exports = { get, upsert, remove, save };

