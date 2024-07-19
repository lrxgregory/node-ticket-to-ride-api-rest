const { RoadEurope } = require('../db/sequelize');
const auth = require('../auth/auth')

module.exports = (app) => {
    app.delete('/api/roads/:id', auth, (req, res) => {
        RoadEurope.scope(null).findByPk(req.params.id)
        .then(road => {
            if (road === null) {
                const message = 'The requested road does not exist. Please try again with another ID.';
                return res.status(404).json({ message });
            }
            return RoadEurope.destroy({
                where: { id: road.id }
            })
            .then(rowsDeleted => {
                if (rowsDeleted === 0) {
                    const message = 'The road could not be deleted. It may have been already deleted or there was an issue with the request.';
                    return res.status(500).json({ message });
                }
                const message = `The road with ID ${road.id} has been successfully deleted.`;
                res.json({ message, data: road });
            })
            .catch(error => {
                console.error('Delete Error:', error);
                const message = 'The road could not be deleted. Please try again in a few moments.';
                res.status(500).json({ message, data: error });
            });
        })
        .catch(error => {
            console.error('Retrieve Error:', error);
            const message = 'An error occurred while retrieving the road. Please try again in a few moments.';
            res.status(500).json({ message, data: error });
        });
    });
};
