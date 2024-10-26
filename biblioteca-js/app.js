const express = require('express');
const sequelize = require('./config/dbConfig');
const bookRoutes = require('./routes/BookRoutes');

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);

const init = async () => {
  await sequelize.sync();
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
};

init();
