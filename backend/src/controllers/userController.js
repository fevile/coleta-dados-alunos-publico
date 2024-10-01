const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const userController = {
  // Registro de novo usuário
  async register(req, res) {
    const { email, password } = req.body;

    try {
      // Hash da senha
      const passwordHash = await bcrypt.hash(password, 10);

      // Cria uma instância do model e salva o usuário
      const userModel = new User();
      const newUser = await userModel.createUser(email, passwordHash);
      await userModel.closeConnection();

      res.status(201).json({ user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  },

  // Login do usuário
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Busca o usuário pelo e-mail
      const userModel = new User();
      const user = await userModel.findUserByEmail(email);
      await userModel.closeConnection();

      // Verifica se o usuário existe e se a senha está correta
      if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({ message: 'Login realizado com sucesso' });
      } else {
        res.status(400).json({ error: 'Credenciais inválidas' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }
};

module.exports = userController;
