require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const DestinationModel = require('../models/destinations');
const RoadModel = require('../models/roads');
const UserModel = require('../models/user');
const destinationsEurope = require('./mock-ticket-to-ride-europe-destinations');
const roadsEurope = require('./mock-ticket-to-ride-europe-roads');
const destinationsUSA = require('./mock-ticket-to-ride-usa-destinations');
const roadsUSA = require('./mock-ticket-to-ride-usa-roads');
const bcrypt = require('bcrypt');

// Configurer Sequelize avec les variables d'environnement
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            timezone: 'Etc/GMT-2',
        },
        logging: false
    }
);

const Destination = DestinationModel(sequelize, DataTypes);
const Road = RoadModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({ force: true }).then(_ => {
        destinationsEurope.map(destination => {
            Destination.create({
                start: destination.start,
                end: destination.end,
                score: destination.score,
                isLongDestination: destination.isLongDestination || false,
                map: destination.map
            }).then(destination => console.log(destination.toJSON()));
        });
        console.log('Destinations Europe has been created !');

        roadsEurope.map(road => {
            Road.create({
                start: road.start,
                end: road.end,
                score: road.score,
                wagonNumber: road.wagonNumber,
                locomotive: road.locomotive,
                map: road.map
            }).then(road => console.log(road.toJSON()));
        });
        console.log('Roads Europe has been created !');

        destinationsUSA.map(destination => {
            Destination.create({
                start: destination.start,
                end: destination.end,
                score: destination.score,
                isLongDestination: destination.isLongDestination || false,
                map: destination.map
            }).then(destination => console.log(destination.toJSON()));
        });
        console.log('Destinations USA has been created !');

        roadsUSA.map(road => {
            Road.create({
                start: road.start,
                end: road.end,
                score: road.score,
                wagonNumber: road.wagonNumber,
                locomotive: road.locomotive,
                map: road.map
            }).then(road => console.log(road.toJSON()));
        });
        console.log('Roads USA has been created !');

        bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
        // Get password hashed        
        .then(passwordHash => User.create({
            username: process.env.ADMIN_USER,
            password: passwordHash
        })
        .then(user => console.log(user.toJSON())));

        console.log('Database initialized !');
    });
};

module.exports = {
    initDb, Destination, Road, User
};
