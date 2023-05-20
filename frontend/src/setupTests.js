// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// const { PORT = 3000, BASE_PATH } = process.env;

// const submitSuccessMarkup = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="stylesheet" href="style.css">
//         <title>Список дел</title>
//         <style>
//             html, body {
//                 font-family: Helvetica, Arial, sans-serif;
//                 -webkit-font-smoothing: antialiased;
//                 height: 100%;
//                 width: 100%;
//                 display: flex;
//                 margin: 0;
//             }

//             .container {
//                 width: 468px;
//                 margin: 0 auto;
//                 padding-top: 100px;
//             }

//             h1 {
//                 font-weight: bold;
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <h1>Форма успешно отправлена</h1>
//             <a href="${BASE_PATH}">Вернуться назад</a>
//         </div>
//     </body>
//     </html>
// `;

// const mainPageMarkup = `
//   <!DOCTYPE html>
//   <html>
//   <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1" />
//     <link rel="stylesheet" href="style.css">
//     <title>Список дел</title>
//     <style>
//       html, body {
//         font-family: Helvetica, Arial, sans-serif;
//         -webkit-font-smoothing: antialiased;
//         height: 100%;
//         width: 100%;
//         display: flex;
//         margin: 0;
//       }

//       input, button {
//         border: none;
//       }

//       .container {
//         width: 468px;
//         margin: 0 auto;
//         padding-top: 100px;
//       }

//       h1 {
//         font-weight: bold;
//       }

//       .input {
//         display: flex;
//         justify-content: space-between;
//       }

//       .input__text {
//         font-size: 0.8em;
//         width: 310px;
//         height: 50px;
//         border-bottom: 1px solid #f1f1f1;
//         padding: 0 10px;
//         box-sizing: border-box;
//       }

//       .input__elem_text::placeholder {
//         color: #d3d3d3;
//       }

//       .input__btn {
//         font-size: 0.8em;
//         width: 150px;
//         height: 50px;
//         background-color: #ffdb4d;
//         border-radius: 2px;
//         cursor: pointer;
//       }
//     </style>
//   </head>
//   <body>
//     <form class="container" method="POST" enctype="text/plain" action="${BASE_PATH}/submit">
//       <h1>Список дел</h1>
//       <div class="input">
//         <input type="text" placeholder="Дело" class="input__text" name="item">
//         <button class="input__btn input__btn_add">
//           Добавить
//         </button>
//       </div>
//     </form>
//   </body>
//   </html>
// `;

// const http = require("http");

// const server = http.createServer((req, res) => {
//   if (req.url === "/" && req.method === "GET") {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     res.end(mainPageMarkup, "utf8");
//   }

//   if (req.url === "/submit" && req.method === "POST") {
//     // установите необходимый статус ответа и заголовки
//     let body = ""; // создайте переменную body

//     req.on("data", (chunk) => {
//       body += chunk;
//     });

//     req.on("end", () => {
//       // верните успешный ответ с разметкой submitSuccessMarkup

//       res.writeHead(200, {
//         "Content-Type": "text/html",
//       });

//       res.end(submitSuccessMarkup, "utf8");
//     });
//   }
// });

// server.listen(PORT);

// import { mainPageMarkup, submitSuccessMarkup } from "./views.js";

// const { PORT = 3000 } = process.env;

// const http = require("http");

// const todos = "";

// const server = http.createServer((req, res) => {
//   if (req.url === "/" && req.method === "GET") {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     res.end(mainPageMarkup, "utf8");
//   }

//   if (req.url === "/submit" && req.method === "POST") {
//     // установите необходимый статус ответа и заголовки
//     let body = ""; // создайте переменную body

//     req.on("data", (chunk) => {
//       body += chunk;
//     });

//     req.on("end", () => {
//       // верните успешный ответ с разметкой submitSuccessMarkup

//       todos.push(body.split("=")[1]);
//       console.log(todos); // например, здесь

//       res.writeHead(200, {
//         "Content-Type": "text/html",
//       });
//       res.end(submitSuccessMarkup, "utf8");
//     });

//     res.end(submitSuccessMarkup, "utf8");
//   }
// });

// server.listen(PORT);


// const { mainPageMarkup, submitSuccessMarkup } = require('./views'); 
// const { getMainPage, postForm } = require('./routes');

// const { PORT = 3000 } = process.env; 


// const http = require('http');

//  const todos = "";

// const server = http.createServer((req, res) => {
  
//   if (req.url === '/' && req.method === 'GET') {
// getMainPage(req, res);
//  };
  
  
//   if (req.url === '/submit' && req.method === 'POST') {
//     // установите необходимый статус ответа и заголовки
//     let body = ''; // создайте переменную body
    
//       req.on('data', (chunk) => {
//     body += chunk;
//   });
    
//       req.on('end', () => {
//     // верните успешный ответ с разметкой submitSuccessMarkup
        
      
       
//             todos.push(body.split('=')[1]);
//         console.log(todos); // например, здесь
        
// res.writeHead(200, {
//   'Content-Type': 'text/html'
// }); 
//     res.end(submitSuccessMarkup, 'utf8');
//   });

 
      
//     res.end(submitSuccessMarkup, 'utf8');
//  };
  

// }
// );
   

// server.listen(PORT);

const { mainPageMarkup, submitSuccessMarkup } = require('./views');

const todos = "";

const getMainPage = (req, res) => {
    
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(mainPageMarkup, "utf8");
};

const postForm = (req, res) => {
    
    // установите необходимый статус ответа и заголовки
    let body = ""; // создайте переменную body

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      // верните успешный ответ с разметкой submitSuccessMarkup

      todos.push(body.split("=")[1]);
      console.log(todos); // например, здесь

      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(submitSuccessMarkup, "utf8");
    });

    res.end(submitSuccessMarkup, "utf8");
  }

module.exports = {
    getMainPage,
    postForm
}; 