const Student = require('../models/studentModel');

const studentController = {

  // Listar todos os estudantes
  async getAll(req, res) {
    try {
      const studentModel = new Student();
      const students = await studentModel.getAllStudents();
      await studentModel.closeConnection();

      res.status(200).json(students);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao listar estudantes' });
    }
  },
  // Criar aluno
  async create(req, res) {
    const { nome_completo, data_nascimento, sexo, ATR, class_id } = req.body;

    try {
      const studentModel = new Student();
      const newStudent = await studentModel.createStudent(nome_completo, data_nascimento, sexo, ATR, class_id);
      await studentModel.closeConnection();

      res.status(201).json(newStudent);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar aluno' });
    }
  },

  // Buscar aluno por ID
  async getById(req, res) {
    const { id } = req.params;

    try {
      const studentModel = new Student();
      const student = await studentModel.getStudentById(id);
      await studentModel.closeConnection();

      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ error: 'Aluno não encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar aluno' });
    }
  },

  // Buscar alunos por nome, data de nascimento e turma (class_id)
  async search(req, res) {
    const { nome_completo, data_nascimento, class_id } = req.query;

    try {
      const studentModel = new Student();
      const students = await studentModel.searchStudents(nome_completo, data_nascimento, class_id);
      await studentModel.closeConnection();

      res.status(200).json(students);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
  },

  // Atualizar aluno
  async update(req, res) {
    const { id } = req.params;
    const { nome_completo, data_nascimento, sexo, ATR, class_id } = req.body;

    try {
      const studentModel = new Student();
      const updatedStudent = await studentModel.updateStudent(id, nome_completo, data_nascimento, sexo, ATR, class_id);
      await studentModel.closeConnection();

      res.status(200).json(updatedStudent);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
  },

  // Deletar aluno
  async delete(req, res) {
    const { id } = req.params;

    try {
      const studentModel = new Student();
      const deletedStudent = await studentModel.deleteStudent(id);
      await studentModel.closeConnection();

      res.status(200).json(deletedStudent);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao deletar aluno' });
    }
  }
};

module.exports = studentController;
