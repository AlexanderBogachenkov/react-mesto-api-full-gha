const express = require("express");
const cors = require("cors");

// const cookieParser = require("cookie-parser");
// const router = require("express").Router();
// const bodyParser = require("body-parser");
const helmet = require("helmet");
const { errors, celebrate, Joi } = require("celebrate");

const mongoose = require("mongoose");
// const corsHandler = require("./middlewares/corsHandler");
const { createUser, login } = require("./controllers/users");
const NotFoundError = require("./utils/NotFoundError");
const errorsHandler = require("./middlewares/errors");
const auth = require("./middlewares/auth");

const userRoute = require("./routes/users");
const cardRoute = require("./routes/cards");
const { REGEX_URL } = require("./utils/constants");

const { PORT = 3000 } = process.env;

const { requestLogger, errorLogger } = require("./middlewares/logger");

// const allowedCors = [
//   "https://alexboga.projectfront.nomoredomains.monster",
//   "http://alexboga.projectfront.nomoredomains.monster",
//   "https://alexboga.projectback.nomoredomains.monster",
//   "http://alexboga.projectback.nomoredomains.monster",
//   "https://127.0.0.1:3000",
//   "http://127.0.0.1:3000",
//   "https://127.0.0.1:3001",
//   "http://127.0.0.1:3001",
//   "http://localhost:3001",
//   "https://localhost:3001",
//   "http://localhost:3000",
//   "https://localhost:3000",
// ];

const app = express();

// const corsOptions = {
//   origin: allowedCors,
//   methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
//   preflightContinue: false,
//   allowedHeaders: ["Content-Type", "Authorization"],
//   optionsSuccessStatus: 204,
//   credentials: true,
// };

// app.use(cors(corsOptions));

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
});

// app.use(corsHandler);

app.use(helmet());
app.disable("x-powered-by");

// старая версия
// app.use(bodyParser.json());

app.use(express.json()); // должно заработать
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(router);

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
    // avatar: Joi.string().regex(/^https?:\/\/(www.)?([\da-z-]+\.)+\/?\S*/im),
    avatar: Joi.string().regex(REGEX_URL),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

// роуты, которым авторизация нужна
app.use("/users", cors(), auth, userRoute);
app.use("/cards", cors(), auth, cardRoute);

// app.use("/*", () => {
//   throw new NotFoundError("Страница по этому адресу не найдена");
// });

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
