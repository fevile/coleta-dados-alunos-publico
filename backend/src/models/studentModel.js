const getClient = require('../config/db');

class Student {
  constructor() {
    this.client = getClient();
    this.client.connect();
  }

  // Listar todos os estudantes
  async getAllStudents() {
    const query = `SELECT * FROM students`;

    try {
      const res = await this.client.query(query);
      return res.rows;
    } catch (err) {
      console.error('Erro ao listar todos os estudantes', err);
      throw err;
    }
  }

  // Criar um novo aluno
  async createStudent(nome_completo, data_nascimento, sexo, ATR, class_id) {
    const query = `
      INSERT INTO students (nome_completo, data_nascimento, sexo, ATR, class_id) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *;
    `;

    try {
      const res = await this.client.query(query, [nome_completo, data_nascimento, sexo, ATR, class_id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao criar aluno', err);
      throw err;
    }
  }

  // Buscar um aluno pelo ID
  async getStudentById(id) {
    const query = `
      SELECT * FROM students 
      WHERE id = $1;
    `;

    try {
      const res = await this.client.query(query, [id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao buscar aluno', err);
      throw err;
    }
  }

  // Buscar alunos por nome, data de nascimento e turma, sem case e sem acentos
  async searchStudents(nome_completo, data_nascimento, class_id) {
    let query = `
      SELECT * FROM students 
      WHERE 1 = 1
    `;
    const params = [];

    // Verifica se o nome_completo foi informado e usa ILIKE e unaccent() para busca sem acentos
    if (nome_completo) {
      query += ` AND unaccent(nome_completo) ILIKE unaccent($${params.length + 1})`;
      params.push(`%${nome_completo}%`);
    }

    // Verifica se a data de nascimento foi informada
    if (data_nascimento) {
      query += ` AND data_nascimento = $${params.length + 1}`;
      params.push(data_nascimento);
    }

    // Verifica se a turma (class_id) foi informada
    if (class_id) {
      query += ` AND class_id = $${params.length + 1}`;
      params.push(class_id);
    }

    try {
      const res = await this.client.query(query, params);
      return res.rows;
    } catch (err) {
      console.error('Erro ao buscar alunos', err);
      throw err;
    }
  }

  // Atualizar um aluno
  async updateStudent(id, nome_completo, data_nascimento, sexo, ATR, class_id) {
    const query = `
      UPDATE students 
      SET nome_completo = $1, data_nascimento = $2, sexo = $3, ATR = $4, class_id = $5 
      WHERE id = $6 
      RETURNING *;
    `;

    try {
      const res = await this.client.query(query, [nome_completo, data_nascimento, sexo, ATR, class_id, id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao atualizar aluno', err);
      throw err;
    }
  }

  // Deletar um aluno
  async deleteStudent(id) {
    const query = `
      DELETE FROM students 
      WHERE id = $1 
      RETURNING *;
    `;

    try {
      const res = await this.client.query(query, [id]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao deletar aluno', err);
      throw err;
    }
  }

  // Fechar conexão
  async closeConnection() {
    await this.client.end();
  }
}

module.exports = Student;
