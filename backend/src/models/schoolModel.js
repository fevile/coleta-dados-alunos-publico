const getClient = require('../config/db');

class School {
  constructor() {
    this.client = getClient();
    this.client.connect();
  }

  // Criar uma nova escola
  async createSchool(nome, endereco, bairro, cidade, estado, telefone) {
    const query = `
      INSERT INTO schools (nome, endereco, bairro, cidade, estado, telefone) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *;
    `;

    try {
      const res = await this.client.query(query, [nome, endereco, bairro, cidade, estado, telefone]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao criar escola', err);
      throw err;
    }
  }

  // Buscar escola pelo ID
  async getSchoolById(id) {
    const query = `
      SELECT * FROM schools 
      WHERE id = $1;
    `;

    try {
      const res = await this.client.query(query, [id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao buscar escola', err);
      throw err;
    }
  }

  // Buscar escolas por nome, endereço, cidade, estado, ignorando acentos e case-insensitive
  async searchSchools(nome, endereco, cidade, estado) {
    let query = `
      SELECT * FROM schools 
      WHERE 1 = 1
    `;
    const params = [];

    if (nome) {
      query += ` AND unaccent(nome) ILIKE unaccent($${params.length + 1})`;
      params.push(`%${nome}%`);
    }

    if (endereco) {
      query += ` AND unaccent(endereco) ILIKE unaccent($${params.length + 1})`;
      params.push(`%${endereco}%`);
    }

    if (cidade) {
      query += ` AND unaccent(cidade) ILIKE unaccent($${params.length + 1})`;
      params.push(`%${cidade}%`);
    }

    if (estado) {
      query += ` AND unaccent(estado) ILIKE unaccent($${params.length + 1})`;
      params.push(`%${estado}%`);
    }

    try {
      const res = await this.client.query(query, params);
      return res.rows;
    } catch (err) {
      console.error('Erro ao buscar escolas', err);
      throw err;
    }
  }

  // Atualizar uma escola
  async updateSchool(id, nome, endereco, bairro, cidade, estado, telefone) {
    const query = `
      UPDATE schools 
      SET nome = $1, endereco = $2, bairro = $3, cidade = $4, estado = $5, telefone = $6 
      WHERE id = $7 
      RETURNING *;
    `;

    try {
      const res = await this.client.query(query, [nome, endereco, bairro, cidade, estado, telefone, id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao atualizar escola', err);
      throw err;
    }
  }

  // Deletar uma escola
  async deleteSchool(id) {
    const query = `
      DELETE FROM schools 
      WHERE id = $1 
      RETURNING *;
    `;

    try {
      const res = await this.client.query(query, [id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao deletar escola', err);
      throw err;
    }
  }

  async getAllSchools() {
    const query = `SELECT * FROM schools`;
  
    try {
      const res = await this.client.query(query);
      return res.rows;
    } catch (err) {
      console.error('Erro ao listar todas as escolas', err);
      throw err;
    }
  }

  // Fechar conexão
  async closeConnection() {
    await this.client.end();
  }

  
}

module.exports = School;
