const { RoadModel } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

/**
 * @swagger
 * /api/roads:
 *   post:
 *     summary: Creates a new raod
 *     tags: [Roads]
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
 *         description: The road was successfully created
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
    app.post('/api/roads', auth, (req, res) => {
        RoadModel.create(req.body)
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