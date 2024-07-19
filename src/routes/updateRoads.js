const { RoadEurope } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
console.log('sdfd');
module.exports = (app) => {
    app.put('/api/roads/:id', (req, res) => {
        const id = req.params.id
        RoadEurope.update(req.body, {
            where: { id: id }
        })
            .then(_ => {
                return RoadEurope.findByPk(id).then(road => {
                    if (road === null) {
                        const message = `The road request doesn't exist. Retry with an other id.`
                        return res.status(404).json({ message })
                    }

                    const message = `The road ${road.start} to ${road.end} has been modified.`
                    res.json({ message, data: road })
                })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: 'error.message', data: error });
                }
                const message = `The road could not be updated. Try again in a moment.`
                res.status(500).json({ message, data: error })
            })
    })
}