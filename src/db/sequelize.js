/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize');
const DestinationEuropeModel = require('../models/destinationsEurope')
const RoadEuropeModel = require('../models/roadsEurope');
const destinationsEurope = require('./mock-ticket-to-ride-europe-destinations');
const roadsEurope = require('./mock-ticket-to-ride-europe-roads');

const sequelize = new Sequelize('ticket-to-ride', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2',
    },
    logging: false
})


const DestinationEurope = DestinationEuropeModel(sequelize, DataTypes);
const RoadEurope = RoadEuropeModel(sequelize, DataTypes); 

const initDb = () => {
    return sequelize.sync({ force: true }).then(_ => {
        destinationsEurope.map(destination => {
            DestinationEurope.create({
                start: destination.start,
                end: destination.end,
                score: destination.score,
                isLongDestination: destination.isLongDestination || false,
                map: destination.map
            }).then(destination => console.log(destination.toJSON()))
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
            }).then(road => console.log(road.toJSON()))
        });
        console.log('Routes insérées avec succès !');

        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, DestinationEurope, RoadEurope
}