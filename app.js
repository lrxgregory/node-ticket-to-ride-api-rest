const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json()
    );

app.use(({ res }) => {
    const message = "Impossible de trouver la ressource demandée";
    res.status(400).json({ message });
});

app.listen(port, () => console.log(`Notre app est démarrée sur le port ${port}`));
