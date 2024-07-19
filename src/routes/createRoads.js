const { RoadEurope } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')


module.exports = (app) => {
    app.post('/api/roads', auth, (req, res) => {
        RoadEurope.create(req.body)
            .then(road => {
                const message = `The road ${req.body.start} to ${req.body.end} has been created.`
                res.json({ message, data: road })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: 'error.message', data: error });
                }
                const message = `The road could not been added. Retry in a moment.`
                res.status(500).json({ message, data: error })
            })
    })
}