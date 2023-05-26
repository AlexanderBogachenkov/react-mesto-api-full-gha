require("dotenv").config();

// console.log(process.env);

const { NODE_ENV, JWT_SECRET } = process.env;

// console.log(NODE_ENV, JWT_SECRET);

/* eslint-disable linebreak-style */
const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../utils/UnauthorizedError");
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("Необходима авторизация"));
    return;
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "some-secret-key");
  } catch (err) {
    // throw new UnauthorizedError("Переданы неверные данные");
    // eslint-disable-next-line consistent-return
    return next(new UnauthorizedError("Переданы неверные данные"));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  // eslint-disable-next-line consistent-return
  next(); // пропускаем запрос дальше
};
