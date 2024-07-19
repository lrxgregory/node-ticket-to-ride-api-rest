const { DestinationEurope } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/destinations', auth, (req, res) => {
        DestinationEurope.create(req.body)
            .then(destination => {
                const message = `The destination ${req.body.name} has been created.`
                res.json({ message, data: destination })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: 'error.message', data: error });
                }
                const message = `The destination could not been added. Retry in a moment.`
                res.status(500).json({ message, data: error })
            })
    })
}