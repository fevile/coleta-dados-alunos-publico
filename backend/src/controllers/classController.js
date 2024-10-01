const Class = require('../models/classModel');

const classController = {
  // Listar todas as classes
  async getAll(req, res) {
    try {
      const classModel = new Class();
      const classes = await classModel.getAllClasses();
      await classModel.closeConnection();

      res.status(200).json(classes);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao listar classes' });
    }
  },
  // Criar uma nova classe
  async create(req, res) {
    const { school_id, nome, turno } = req.body;

    try {
      const classModel = new Class();
      const newClass = await classModel.createClass(school_id, nome, turno);
      await classModel.closeConnection();

      res.status(201).json(newClass);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar classe' });
    }
  },

  // Buscar classe por ID
  async getById(req, res) {
    const { id } = req.params;

    try {
      const classModel = new Class();
      const classData = await classModel.getClassById(id);
      await classModel.closeConnection();

      if (classData) {
        res.status(200).json(classData);
      } else {
        res.status(404).json({ error: 'Classe não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar classe' });
    }
  },

  // Buscar classes por school_id
  async searchBySchoolId(req, res) {
    const { school_id } = req.query;

    try {
      const classModel = new Class();
      const classes = await classModel.searchClassesBySchoolId(school_id);
      await classModel.closeConnection();

      res.status(200).json(classes);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar classes' });
    }
  },

  // Atualizar classe
  async update(req, res) {
    const { id } = req.params;
    const { nome, turno } = req.body;

    try {
      const classModel = new Class();
      const updatedClass = await classModel.updateClass(id, nome, turno);
      await classModel.closeConnection();

      res.status(200).json(updatedClass);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar classe' });
    }
  },

  // Deletar classe
  async delete(req, res) {
    const { id } = req.params;

    try {
      const classModel = new Class();
      const deletedClass = await classModel.deleteClass(id);
      await classModel.closeConnection();

      res.status(200).json(deletedClass);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao deletar classe' });
    }
  }
};

module.exports = classController;
