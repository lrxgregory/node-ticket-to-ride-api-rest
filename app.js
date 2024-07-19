const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = 3000;

// Middleware
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json()
    );

//Init Database
sequelize.initDb();

app.use(({ res }) => {
    const message = "Unable to find requested resource";
    res.status(400).json({ message });
});

app.listen(port, () => console.log(`Our app is started on the port ${port}`));
