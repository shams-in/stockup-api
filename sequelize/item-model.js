module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      name: {
        type: DataTypes.STRING,
        field: "name",
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        field: "quantity",
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        allowNull: false,
      },
    },
    {
      schema: "public",
      tableName: "item",
    }
  );
  Item.associate = function (models) {
    Item.belongsTo(models.Category, {
      as: "category",
      foreignKey: {
        name: "categoryId",
        field: "category_id",
      },
      targetKey: "id",
    });
  };

  return Item;
};
