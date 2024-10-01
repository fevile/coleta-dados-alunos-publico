const School = require('../models/schoolModel');

const schoolController = {

    // Listar todas as escolas
    async getAll(req, res) {
      try {
        const schoolModel = new School();
        const schools = await schoolModel.getAllSchools();
        await schoolModel.closeConnection();
  
        res.status(200).json(schools);
      } catch (err) {
        res.status(500).json({ error: 'Erro ao listar escolas' });
      }
    },
  // Criar uma nova escola
  async create(req, res) {
    const { nome, endereco, bairro, cidade, estado, telefone } = req.body;

    try {
      const schoolModel = new School();
      const newSchool = await schoolModel.createSchool(nome, endereco, bairro, cidade, estado, telefone);
      await schoolModel.closeConnection();

      res.status(201).json(newSchool);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar escola' });
    }
  },

  // Buscar escola por ID
  async getById(req, res) {
    const { id } = req.params;

    try {
      const schoolModel = new School();
      const school = await schoolModel.getSchoolById(id);
      await schoolModel.closeConnection();

      if (school) {
        res.status(200).json(school);
      } else {
        res.status(404).json({ error: 'Escola não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar escola' });
    }
  },

  // Buscar escolas por nome, endereço, cidade, estado
  async search(req, res) {
    const { nome, endereco, cidade, estado } = req.query;

    try {
      const schoolModel = new School();
      const schools = await schoolModel.searchSchools(nome, endereco, cidade, estado);
      await schoolModel.closeConnection();

      res.status(200).json(schools);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar escolas' });
    }
  },

  // Atualizar escola
  async update(req, res) {
    const { id } = req.params;
    const { nome, endereco, bairro, cidade, estado, telefone } = req.body;

    try {
      const schoolModel = new School();
      const updatedSchool = await schoolModel.updateSchool(id, nome, endereco, bairro, cidade, estado, telefone);
      await schoolModel.closeConnection();

      res.status(200).json(updatedSchool);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar escola' });
    }
  },

  // Deletar escola
  async delete(req, res) {
    const { id } = req.params;

    try {
      const schoolModel = new School();
      const deletedSchool = await schoolModel.deleteSchool(id);
      await schoolModel.closeConnection();

      res.status(200).json(deletedSchool);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao deletar escola' });
    }
  }
};

module.exports = schoolController;
