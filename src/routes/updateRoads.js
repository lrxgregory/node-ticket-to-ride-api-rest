const { RoadModel } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

/**
 * @swagger
 * /api/roads/{id}:
 *   put:
 *     summary: Update an existing road
 *     tags: [Roads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The road ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The road was successfully updated
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
    app.put('/api/roads/:id', auth, (req, res) => {
        const id = req.params.id
        RoadModel.update(req.body, {
            where: { id: id }
        })
            .then(_ => {
                return RoadModel.findByPk(id).then(road => {
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