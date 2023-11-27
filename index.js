const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const { check, validationResult } = require('express-validator'); //&&&&&&&&&&&
require('dotenv').config();

const app = express();
const serverPort = process.env.SERVER_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const HomeRouter = require('./routes/HomeRoute');

app.use(express.static('public'));

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    helpers: {
        // Define a custom equality helper
        ifEquals: function(arg1, arg2, options) {
            return arg1 === arg2 ? options.fn(this) : options.inverse(this);
        }
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', HomeRouter);

app.listen(serverPort, () => {
    console.log(`server up and running on port ${serverPort}`);
});
