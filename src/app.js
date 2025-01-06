const express = require('express');
const { sequelize } = require('./models');  // Ensure sequelize instance is imported
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// Synchronize models with the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
    
    // After sync, start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error syncing the database:', error);
  });

// Middleware and routes setup
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);
app.use('/api/analytics', analyticsRoutes);

module.exports = app;

