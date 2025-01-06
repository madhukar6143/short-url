module.exports = (sequelize, DataTypes) => {
  const URL = sequelize.define('URL', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    longUrl: { type: DataTypes.TEXT, allowNull: false },
    shortUrl: { type: DataTypes.STRING, unique: true, allowNull: false },
    topic: { type: DataTypes.STRING },
    userId: { type: DataTypes.UUID, allowNull: false },
  }, {
    timestamps: true, // Automatically manage createdAt and updatedAt
  });

  URL.associate = function(models) {
    URL.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return URL;
};
