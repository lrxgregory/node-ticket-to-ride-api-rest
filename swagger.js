const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'How to use the API Rest Ticket to Ride',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            schemas: {
                Destination: {
                    type: 'object',
                    required: ['name', 'description'],
                    properties: {
                        start: {
                            type: 'string',
                            description: 'Destination start'
                        },
                        end: {
                            type: 'string',
                            description: 'Destination end'
                        },
                        score: {
                            type: 'integer',
                            description: 'Destination score'
                        },
                        isLongDestination: {
                            type: 'boolean',
                            description: 'Destination is a long destination or not'
                        },
                        map: {
                            type: 'string',
                            description: 'Map of the game (Europe, USA)'
                        }
                    },
                },
                Road: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Road ID'
                        },
                        name: {
                            type: 'string',
                            description: 'Road name'
                        },
                        length: {
                            type: 'number',
                            description: 'Length of the road'
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
