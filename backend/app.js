// const cookieParser = require("cookie-parser");

// const cors = require("cors");

const express = require("express");
// const router = require("express").Router();
// const bodyParser = require("body-parser");
const helmet = require("helmet");
const { errors, celebrate, Joi } = require("celebrate");

const mongoose = require("mongoose");
const corsHandler = require("./middlewares/corsHandler");
const { createUser, login } = require("./controllers/users");
const NotFoundError = require("./utils/NotFoundError");
const errorsHandler = require("./middlewares/errors");
const auth = require("./middlewares/auth");

// const router = require("./routes/index");
const userRoute = require("./routes/users");
const cardRoute = require("./routes/cards");
const { regEx } = require("./utils/constants");

const { PORT = 3000 } = process.env;
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(corsHandler);

app.use(helmet());
app.disable("x-powered-by");

// старая версия
// app.use(bodyParser.json());
app.use(express.json()); // должно заработать
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(router);
// app.use(cors());

app.use(requestLogger); // подключаем логгер запросов

// Краш-тест сервера
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.post("/signin", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post("/signup", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    // avatar: Joi.string().regex(/^https?:\/\/(www.)?([\da-z-]+\.)+\/?\S*/im),
    avatar: Joi.string().regex(regEx),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

// роуты, которым авторизация нужна
app.use("/users", auth, userRoute);
app.use("/cards", auth, cardRoute);

app.use(errorLogger); // подключаем логгер ошибок

// app.use("/*", () => {
//   throw new NotFoundError("Страница по этому адресу не найдена");
// });

app.use("*", auth, (req, res, next) => {
  next(new NotFoundError("Страница по этому адресу не найдена"));
});

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
