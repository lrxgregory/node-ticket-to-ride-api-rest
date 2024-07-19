module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Road', {
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
        wagonNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        locomotive: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        map: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}