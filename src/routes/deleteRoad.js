const { RoadModel } = require('../db/sequelize');
const auth = require('../auth/auth')

/**
 * @swagger
 * /api/roads/{id}:
 *   delete:
 *     summary: Delete an existing road
 *     tags: [Roads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The road ID
 *     responses:
 *       200:
 *         description: The road was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Road'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       404:
 *         description: Road not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
module.exports = (app) => {
    app.delete('/api/roads/:id', auth, (req, res) => {
        RoadModel.scope(null).findByPk(req.params.id)
        .then(road => {
            if (road === null) {
                const message = 'The requested road does not exist. Please try again with another ID.';
                return res.status(404).json({ message });
            }
            return RoadModel.destroy({
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
