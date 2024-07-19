const { Destination } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/destinations/:id', (req, res) => {
        Destination.findByPk(req.params.id)
            .then(destination => {
                if (destination === null) {
                    const message = 'The requested destination does not exist. Please try again with another id';
                    return res.status(404).json(message);
                }
                const message = 'The destination has been found.'
                res.json({ message, data: pokemon })
            })
            .catch()
    })
}