const { Destination } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

/**
 * @swagger
 * /api/destinations:
 *   post:
 *     summary: Creates a new destination
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start
 *               - end
 *               - score
 *               - isLongDestination
 *               - map
 *             properties:
 *               start:
 *                 type: string
 *               end:
 *                 type: string
 *               score:
 *                 type: integer
 *               isLongDestination:
 *                 type: boolean
 *               map:
 *                 type: string
 *     responses:
 *       200:
 *         description: The destination was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Destination'
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
    app.post('/api/destinations', auth, (req, res) => {
        Destination.create(req.body)
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