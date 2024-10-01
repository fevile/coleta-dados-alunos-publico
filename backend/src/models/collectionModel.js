const getClient = require('../config/db');

class Collection {
  constructor() {
    this.client = getClient();
    this.client.connect();
  }

  // Criar um novo registro de coleta para um aluno
  async createCollection(id_student, class_id, data_coleta, peso1, altura1, peso2, altura2) {
    const query = `
      INSERT INTO collections (id_student, class_id, data_coleta, peso1, altura1, peso2, altura2) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *;
    `;
  
    try {
      const res = await this.client.query(query, [id_student, class_id, data_coleta, peso1, altura1, peso2, altura2]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao criar registro de coleta', err);
      throw err;
    }
  }
  

  // Buscar registros de coleta por aluno
  async getCollectionsByStudent(id_student) {
    const query = `
      SELECT * FROM collections 
      WHERE id_student = $1;
    `;

    try {
      const res = await this.client.query(query, [id_student]);
      return res.rows;
    } catch (err) {
      console.error('Erro ao buscar registros de coleta', err);
      throw err;
    }
  }

  // Buscar registros de coleta por data e turma
  async getCollectionsByDateAndClass(data_coleta, id_class) {
    const query = `
      SELECT collections.*, students.nome_completo 
      FROM collections
      JOIN students ON collections.id_student = students.id
      JOIN classes ON students.class_id = classes.id
      WHERE collections.data_coleta = $1
      AND classes.id = $2;
    `;

    try {
      const res = await this.client.query(query, [data_coleta, id_class]);
      return res.rows;
    } catch (err) {
      console.error('Erro ao buscar registros por data e turma', err);
      throw err;
    }
  }

  // Atualizar um registro de coleta
  async updateCollection(id, class_id, data_coleta, peso1, altura1, peso2, altura2) {
    const query = `
      UPDATE collections 
      SET class_id = $1, data_coleta = $2, peso1 = $3, altura1 = $4, peso2 = $5, altura2 = $6 
      WHERE id = $7 
      RETURNING *;
    `;
  
    try {
      const res = await this.client.query(query, [class_id, data_coleta, peso1, altura1, peso2, altura2, id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao atualizar registro de coleta', err);
      throw err;
    }
  }
  

  // Deletar um registro de coleta
  async deleteCollection(id) {
    const query = `
      DELETE FROM collections 
      WHERE id = $1 
      RETURNING *;
    `;

    try {
      const res = await this.client.query(query, [id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao deletar registro de coleta', err);
      throw err;
    }
  }

  // Fechar conexão
  async closeConnection() {
    await this.client.end();
  }
}

module.exports = Collection;
