const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const classRoutes = require('./routes/classRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const tableRoutes = require('./routes/tableRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Usar as rotas de usuário
app.use('/users', userRoutes);

// Rota para criar tabelas
app.use('/', tableRoutes);

// Usar as rotas de alunos
app.use('/students', studentRoutes);

// Usar as rotas de escolas
app.use('/schools', schoolRoutes);

// Usar as rotas de classes
app.use('/classes', classRoutes);

// Usar as rotas de coletas
app.use('/collections', collectionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
