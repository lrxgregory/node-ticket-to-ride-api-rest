const { Road } = require('../db/sequelize');
const { Op } = require('sequelize');
const apicache = require('apicache');
const cache = apicache.middleware;

/**
 * @swagger
 * /api/roads:
 *   get:
 *     summary: Get all roads
 *     tags: [Roads]
 *     parameters:
 *       - in: path
 *         name: start
 *         required: false
 *         schema:
 *           type: string
 *         description: The road start
 *       - in: path
 *         name: end
 *         required: false
 *         schema:
 *           type: string
 *         description: The road end
 *       - in: path
 *         name: isLongDestination
 *         required: false
 *         schema:
 *           type: boolean
 *         description: If the road is a long road or not
 *       - in: path
 *         name: map
 *         required: false
 *         schema:
 *           type: string
 *         description: Choose the map of the board game (Europe, USA)
 *       - in: path
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of results to display
 *     responses:
 *       200:
 *         description: Success
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
    app.get('/api/roads', cache('24 hours'), async (req, res) => {
        const { start, end, map, limit } = req.query;

        // Construct the where clause dynamically
        const whereClause = {};

        if (start) {
            if (start.length < 2) {
                const message = `'start' search term must be at least 2 characters long.`;
                return res.status(400).json({ message });
            }
            whereClause.start = { [Op.like]: `%${start}%` };
        }

        if (end) {
            if (end.length < 2) {
                const message = `'end' search term must be at least 2 characters long.`;
                return res.status(400).json({ message });
            }
            if (!whereClause.end) {
                whereClause.end = {};
            }
            whereClause.end[Op.like] = `%${end}%`;
        }

        if (map) {
            try {
                const mapExists = await Road.findOne({ where: { map } });
                if (!mapExists) {
                    const message = `The specified 'map' value does not exist.`;
                    return res.status(400).json({ message });
                }
                whereClause.map = map;
            } catch (error) {
                const message = `An error occurred while checking 'map'. Please try again later.`;
                return res.status(500).json({ message, data: error });
            }
        }

        try {
            const roads = await Road.findAndCountAll({
                where: whereClause,
                order: [['id', 'ASC']], // Sort by 'id'
                limit: limit ? parseInt(limit) : undefined
            });
            const message = `There are ${roads.count} roads matching your search.`;
            res.json({ message, data: roads.rows });
        } catch (error) {
            const message = `Failed to retrieve roads. Please try again later.`;
            res.status(500).json({ message, data: error });
        }
    });
};
