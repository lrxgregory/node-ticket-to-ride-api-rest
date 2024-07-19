require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const DestinationEuropeModel = require('../models/destinationsEurope');
const RoadEuropeModel = require('../models/roadsEurope');
const destinationsEurope = require('./mock-ticket-to-ride-europe-destinations');
const roadsEurope = require('./mock-ticket-to-ride-europe-roads');
const bcrypt = require('bcrypt'); // Assurez-vous d'inclure bcrypt pour le hashage des mots de passe
const userModel = require('../models/user'); // Importez votre modèle utilisateur

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

const DestinationEurope = DestinationEuropeModel(sequelize, DataTypes);
const RoadEurope = RoadEuropeModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({ force: true }).then(_ => {
        destinationsEurope.map(destination => {
            DestinationEurope.create({
                start: destination.start,
                end: destination.end,
                score: destination.score,
                isLongDestination: destination.isLongDestination || false,
                map: destination.map
            }).then(destination => console.log(destination.toJSON()));
        });
        console.log('Destinations insérées avec succès !');

        roadsEurope.map(road => {
            RoadEurope.create({
                start: road.start,
                end: road.end,
                score: road.score,
                wagonNumber: road.wagonNumber,
                locomotive: road.locomotive,
                map: road.map
            }).then(road => console.log(road.toJSON()));
        });
        console.log('Routes insérées avec succès !');

        bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
        // Get password hashed        
        .then(passwordHash => User.create({
            username: process.env.ADMIN_USER,
            password: passwordHash
        })
        .then(user => console.log(user.toJSON())));

        console.log('La base de données a bien été initialisée !');
    });
};

module.exports = {
    initDb, DestinationEurope, RoadEurope
};
