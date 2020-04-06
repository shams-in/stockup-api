module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'Category',
        {
            name: {
                type: DataTypes.STRING,
                field: 'name',
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at',
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at',
                allowNull: false
            }
        },
        {
            schema: 'public',
            tableName: 'category'
        }
    )

    return Category
}
