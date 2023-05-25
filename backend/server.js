const logger = require("./common/logging");

process.on("unhandledRejection", reason => {
  process.emit("uncaughtException", reason);
});

const mongoose = require("mongoose");
const { PORT, MONGO_CONNECTION_STRING } = require("./common/config");
const app = require("./app");

mongoose.set("strictQuery", false);

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", () => logger.error("MongoDB connection error:")).once("open", () => {
  logger.info("Successfully connect to DB");
  app.listen(PORT, () => logger.info(`App is running on http://localhost:${PORT}`));
  logger.info("Нажмите CTRL+C, чтобы остановить сервер");
  logger.info("GET /products - получить список продуктов");
  logger.info("GET /products?list=${id, id, id} - получить список продуктов по id");
  logger.info("GET /products/${id} - получить продукт по его ID");
  logger.info("GET /products?shop=${shop} - получить продукты по магазинам ${shop}");
  logger.info("GET /users/${id}/tokens - получить токен доступа пользователя");
  logger.info("POST /users - создать(зарегистрировать) пользователя");
  logger.info("POST /signin - залогинить пользователя");
  logger.info("GET users/${userID}/orders - получить заказы пользователя");
  logger.info("PUT users/${userID}/orders - отправить заказы пользователя на сервер");
});

