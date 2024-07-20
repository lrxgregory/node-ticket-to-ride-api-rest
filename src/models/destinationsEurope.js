module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Destination', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        start: {
            type: DataTypes.STRING,
            allowNull: false
        },
        end: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isLongDestination: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        map: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        defaultScope: {
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } // Exclude these attributes by default
        },
        indexes: [
            {
                unique: true,
                fields: ['start', 'end']
            }
        ]
    });
}
