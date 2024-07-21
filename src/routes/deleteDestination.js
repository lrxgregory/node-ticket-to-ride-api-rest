const { Destination } = require('../db/sequelize');
const auth = require('../auth/auth')

/**
 * @swagger
 * /api/destinations/{id}:
 *   delete:
 *     summary: Delete an existing destination
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The destination ID
 *     responses:
 *       200:
 *         description: The destination was successfully deleted
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
    app.delete('/api/destinations/:id',auth, (req, res) => {
        Destination.scope(null).findByPk(req.params.id)
        .then(destination => {
            if (destination === null) {
                const message = 'The requested destination does not exist. Please try again with another ID.';
                return res.status(404).json({ message });
            }
            return Destination.destroy({
                where: { id: destination.id }
            })
            .then(rowsDeleted => {
                if (rowsDeleted === 0) {
                    const message = 'The destination could not be deleted. It may have been already deleted or there was an issue with the request.';
                    return res.status(500).json({ message });
                }
                const message = `The destination with ID ${destination.id} has been successfully deleted.`;
                res.json({ message, data: destination });
            })
            .catch(error => {
                console.error('Delete Error:', error);
                const message = 'The destination could not be deleted. Please try again in a few moments.';
                res.status(500).json({ message, data: error });
            });
        })
        .catch(error => {
            console.error('Retrieve Error:', error);
            const message = 'An error occurred while retrieving the destination. Please try again in a few moments.';
            res.status(500).json({ message, data: error });
        });
    });
};
