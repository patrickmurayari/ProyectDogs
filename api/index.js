//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT =process.env.PORT ||  3001;
// Syncing all the models at once.
// server.listen(PORT, async () => {
//   console.log( `Server raised in port: http://localhost:${PORT}`);
//   console.log(":::::" ,conn.models);
//   await conn.sync({force : true})
// });

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at http://localhost:3001'); // eslint-disable-line no-console
  });
});
