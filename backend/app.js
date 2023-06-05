const express = require("express");
const cors = require("cors");

const helmet = require("helmet");
const { errors, celebrate, Joi } = require("celebrate");

const mongoose = require("mongoose");
const { createUser, login } = require("./controllers/users");
const NotFoundError = require("./utils/NotFoundError");
const errorsHandler = require("./middlewares/errors");
const auth = require("./middlewares/auth");

const userRoute = require("./routes/users");
const cardRoute = require("./routes/cards");
const { REGEX_URL } = require("./utils/constants");

const { PORT = 3001 } = process.env;

const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(helmet());
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

// Краш-тест сервера
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.post("/signin", cors(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post("/signup", cors(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGEX_URL),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

// роуты, которым авторизация нужна
app.use("/users", cors(), auth, userRoute);
app.use("/cards", cors(), auth, cardRoute);

app.use("*", cors(), auth, (req, res, next) => {
  next(new NotFoundError("Страница по этому адресу не найдена"));
});

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // console.log(`App listening on port ${PORT}`);
});
