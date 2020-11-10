const http = require('http');
const app = require('./app');
const db = require('./models');

const port = process.env.PORT  || 3000;

const server = http.createServer(app);

db.sequelize.sync().then((result)=>{
    server.listen(port);
})