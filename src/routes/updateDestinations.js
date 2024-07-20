const { Destination } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.put('/api/destinations/:id', auth, (req, res) => {
        const id = req.params.id
        Destination.update(req.body, {
            where: { id: id }
        })
            .then(_ => {
                return Destination.findByPk(id).then(destination => {
                    if (destination === null) {
                        const message = `The destination request doesn't exist. Retry with an other id.`
                        return res.status(404).json({ message })
                    }

                    const message = `The destination ${destination.start} to ${destination.end} has been modified.`
                    res.json({ message, data: destination })
                })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: 'error.message', data: error });
                }
                const message = `The destination could not be updated. Try again in a moment.`
                res.status(500).json({ message, data: error })
            })
    })
}