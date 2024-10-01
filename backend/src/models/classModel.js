const getClient = require('../config/db');

class Class {
  constructor() {
    this.client = getClient();
    this.client.connect();
  }

  // Listar todas as classes
  async getAllClasses() {
    const query = `SELECT * FROM classes`;

    try {
      const res = await this.client.query(query);
      return res.rows;
    } catch (err) {
      console.error('Erro ao listar todas as classes', err);
      throw err;
    }
  }


  // Criar uma nova classe
  async createClass(school_id, nome, turno) {
    const query = `
      INSERT INTO classes (school_id, nome, turno) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;

    try {
      const res = await this.client.query(query, [school_id, nome, turno]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao criar classe', err);
      throw err;
    }
  }

  // Buscar classe pelo ID
  async getClassById(id) {
    const query = `
      SELECT * FROM classes 
      WHERE id = $1;
    `;

    try {
      const res = await this.client.query(query, [id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao buscar classe', err);
      throw err;
    }
  }

  // Buscar classes por school_id
  async searchClassesBySchoolId(school_id) {
    const query = `
      SELECT * FROM classes 
      WHERE school_id = $1;
    `;

    try {
      const res = await this.client.query(query, [school_id]);
      return res.rows;
    } catch (err) {
      console.error('Erro ao buscar classes por school_id', err);
      throw err;
    }
  }

  // Atualizar uma classe
  async updateClass(id, nome, turno) {
    const query = `
      UPDATE classes 
      SET nome = $1, turno = $2 
      WHERE id = $3 
      RETURNING *;
    `;

    try {
      const res = await this.client.query(query, [nome, turno, id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao atualizar classe', err);
      throw err;
    }
  }

  // Deletar uma classe
  async deleteClass(id) {
    const query = `
      DELETE FROM classes 
      WHERE id = $1 
      RETURNING *;
    `;

    try {
      const res = await this.client.query(query, [id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao deletar classe', err);
      throw err;
    }
  }

  // Fechar conexão
  async closeConnection() {
    await this.client.end();
  }
}

module.exports = Class;
