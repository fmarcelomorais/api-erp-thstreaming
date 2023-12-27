const app = require('./src/app/app.js');
require('dotenv').config();

app.listen(process.env.PORT, () => console.log('listening in port:' + process.env.PORT));