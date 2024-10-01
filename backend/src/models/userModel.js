const getClient = require('../config/db');

class User {
  constructor() {
    this.client = getClient();
    this.client.connect();
  }

  async createUser(email, passwordHash) {
    const query = `
      INSERT INTO users (email, password) 
      VALUES ($1, $2) 
      RETURNING *;
    `;

    try {
      const res = await this.client.query(query, [email, passwordHash]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao criar usuário', err);
      throw err;
    }
  }

  async findUserByEmail(email) {
    const query = `
      SELECT * FROM users 
      WHERE email = $1;
    `;

    try {
      const res = await this.client.query(query, [email]);
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao buscar usuário', err);
      throw err;
    }
  }

  async closeConnection() {
    await this.client.end();
  }
}

module.exports = User;
