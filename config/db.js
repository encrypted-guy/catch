const mongoose = require('mongoose');
const chalk = require('chalk');
const ERROR = chalk.bgRed.black;
const SUCCESS = chalk.bgGreen.black;
const INFO = chalk.bgBlue.black;


const URI = process.env.MONGO_URI;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const conn = mongoose.connection;
conn.on('error', error => {
    console.log(ERROR(` cant connect to database. | ${error} `));
});
conn.once('open', () => {
    console.log(SUCCESS(` database connected successfully `));
});
