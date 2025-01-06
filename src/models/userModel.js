module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      name: { type: DataTypes.STRING },
      googleId: { type: DataTypes.STRING, unique: true, allowNull: false },
    });
  
    User.associate = function(models) {
      User.hasMany(models.URL, { foreignKey: 'userId', as: 'urls' });
    };
  
    return User;
  };
  