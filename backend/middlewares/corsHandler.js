// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  "https://alexboga.projectfront.nomoredomains.monster",
  "http://alexboga.projectfront.nomoredomains.monster",
  "https://alexboga.projectback.nomoredomains.monster",
  "http://alexboga.projectback.nomoredomains.monster",
  // "https://127.0.0.1:3000",
  // "http://127.0.0.1:3000",
  // "https://127.0.0.1:3001",
  // "http://127.0.0.1:3001",
  // "http://localhost:3001",
  // "https://localhost:3001",
  // "http://localhost:3000",
  // "https://localhost:3000",
];

const corsHandler = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];
  res.header("Access-Control-Allow-Credentials", true);
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header("Access-Control-Allow-Origin", origin);
  }

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === "OPTIONS") {
  // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header("Access-Control-Allow-Headers", requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  return next();
};

module.exports = corsHandler;
