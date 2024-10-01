const getClient = require('../config/db');

const createTables = async () => {
  const client = getClient();

  const query = `
    CREATE TABLE IF NOT EXISTS schools (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      endereco VARCHAR(255) NOT NULL,
      bairro VARCHAR(150) NOT NULL,
      cidade VARCHAR(150) NOT NULL,
      estado VARCHAR(2) NOT NULL,
      telefone VARCHAR(20) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS classes (
      id SERIAL PRIMARY KEY,
      school_id INTEGER REFERENCES schools(id),
      nome VARCHAR(255) NOT NULL,
      turno VARCHAR(10) NOT NULL CHECK (turno IN ('manha', 'tarde', 'noite'))
    );

        CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      nome_completo VARCHAR(255) NOT NULL,
      data_nascimento DATE NOT NULL,
      sexo CHAR(1) CHECK (sexo IN ('M', 'F')),
      ATR CHAR(1) CHECK (ATR IN ('S', 'N'))
      class_id INTEGER REFERENCES classes(id);
    );

    CREATE TABLE IF NOT EXISTS collections (
      id SERIAL PRIMARY KEY,
      id_student INTEGER REFERENCES students(id),
      class_id INTEGER REFERENCES classes(id),
      data_coleta DATE,
      peso1 DECIMAL(5,2),
      altura1 DECIMAL(5,2),
      peso2 DECIMAL(5,2),
      altura2 DECIMAL(5,2)
    );

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE EXTENSION IF NOT EXISTS unaccent;
  `;

  try {
    await client.connect();
    await client.query(query);
    console.log('Tabelas criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabelas', error);
  } finally {
    await client.end();
  }
};

module.exports = createTables;
