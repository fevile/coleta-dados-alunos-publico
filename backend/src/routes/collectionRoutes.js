const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

// Buscar registros de coleta por data e turma
router.get('/search', collectionController.getByDateAndClass);

// Criar um novo registro de coleta
router.post('/', collectionController.create);

// Buscar registros de coleta por aluno
router.get('/student/:id_student', collectionController.getByStudent);


// Atualizar um registro de coleta
router.put('/:id', collectionController.update);

// Deletar um registro de coleta
router.delete('/:id', collectionController.delete);

module.exports = router;
