const { Road } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/destinations/:id', auth, (req, res) => {
        Road.findByPk(req.params.id)
            .then(road => {
                if (road === null) {
                    const message = 'The requested road does not exist. Please try again with another id';
                    return res.status(404).json(message);
                }
                const message = 'The road has been found.'
                res.json({ message, data: pokemon })
            })
            .catch()
    })
}