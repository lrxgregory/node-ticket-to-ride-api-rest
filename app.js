const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json()
    );

//Init Database
sequelize.initDb();

//Routes
require('./src/routes/createDestination')(app);
require('./src/routes/createRoads')(app);
require('./src/routes/getDestinations')(app);
require('./src/routes/getRoads')(app);
require('./src/routes/updateDestinations')(app);
require('./src/routes/updateRoads')(app);
require('./src/routes/deleteDestination')(app);
require('./src/routes/deleteRoad')(app);
require('./src/routes/login')(app);

app.use(({ res }) => {
    const message = "Unable to find requested resource";
    res.status(400).json({ message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});