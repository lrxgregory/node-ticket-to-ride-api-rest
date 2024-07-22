const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cache = require('./cache');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for cache
function cacheMiddleware(req, res, next) {
    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);
  
    if (cachedResponse) {
      return res.send(cachedResponse);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.set(key, body);
        res.sendResponse(body);
      };
      next();
    }
  }

// Configure Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json()
    );

//Init Database
sequelize.initDb();

//Routes
app.use('/destinations', cacheMiddleware, require('./src/routes/createDestination'));
app.use('/roads', cacheMiddleware, require('./src/routes/createRoads'));
app.use('/destinations', cacheMiddleware, require('./src/routes/getDestinations'));
app.use('/roads', cacheMiddleware, require('./src/routes/getRoads'));
app.use('/destinations', cacheMiddleware, require('./src/routes/updateDestinations'));
app.use('/roads', cacheMiddleware, require('./src/routes/updateRoads'));
app.use('/destinations', cacheMiddleware, require('./src/routes/deleteDestination'));
app.use('/roads', cacheMiddleware, require('./src/routes/deleteRoad'));
app.use('/login', require('./src/routes/login'));

app.use(({ res }) => {
    const message = "Unable to find requested resource";
    res.status(400).json({ message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});