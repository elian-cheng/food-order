const orderRepo = require("./order.db.repository");

const get = async userId => orderRepo.get(userId);

const save = async order => orderRepo.save(order);

const upsert = async (userId, order) => orderRepo.upsert(userId, { ...order, userId });

const remove = async userId => orderRepo.remove(userId);

module.exports = { get, upsert, remove, save };

