const Collection = require('../models/collectionModel');

const collectionController = {
    // Criar um novo registro de coleta para um aluno
    async create(req, res) {
        const { id_student, class_id, data_coleta, peso1, altura1, peso2, altura2 } = req.body;

        try {
            const collectionModel = new Collection();
            const newCollection = await collectionModel.createCollection(id_student, class_id, data_coleta, peso1, altura1, peso2, altura2);
            await collectionModel.closeConnection();

            res.status(201).json(newCollection);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao criar registro de coleta' });
        }
    },

    // Buscar registros de coleta por aluno
    async getByStudent(req, res) {
        const { id_student } = req.params;

        try {
            const collectionModel = new Collection();
            const collections = await collectionModel.getCollectionsByStudent(id_student);
            await collectionModel.closeConnection();

            res.status(200).json(collections);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar registros de coleta' });
        }
    },

    // Buscar registros de coleta por data e turma
    async getByDateAndClass(req, res) {
        const { data_coleta, id_class } = req.query;

        try {
            const collectionModel = new Collection();
            const collections = await collectionModel.getCollectionsByDateAndClass(data_coleta, id_class);
            await collectionModel.closeConnection();

            res.status(200).json(collections);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar registros de coleta' });
        }
    },

    // Atualizar um registro de coleta
    async update(req, res) {
        const { id } = req.params;
        const { class_id, data_coleta, peso1, altura1, peso2, altura2 } = req.body;

        try {
            const collectionModel = new Collection();
            const updatedCollection = await collectionModel.updateCollection(id, class_id, data_coleta, peso1, altura1, peso2, altura2);
            await collectionModel.closeConnection();

            res.status(200).json(updatedCollection);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao atualizar registro de coleta' });
        }

    },

    // Deletar um registro de coleta
    async delete(req, res) {
        const { id } = req.params;

        try {
            const collectionModel = new Collection();
            const deletedCollection = await collectionModel.deleteCollection(id);
            await collectionModel.closeConnection();

            res.status(200).json(deletedCollection);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao deletar registro de coleta' });
        }
    }
};

module.exports = collectionController;
