# Estrutura da Pasta `src`


### Arquivo: `app.js`

```js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const classRoutes = require('./routes/classRoutes');
const collectionRou
...
```

## Pasta: `config`


### Arquivo: `config\db.js`

```js
const { Client } = require('pg');
require('dotenv').config();

const getClient = () => {
  return new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
  });
};


...
```

## Pasta: `controllers`


### Arquivo: `controllers\classController.js`

```js
const Class = require('../models/classModel');

const classController = {
  // Criar uma nova classe
  async create(req, res) {
    const { school_id, nome, turno } = req.body;

    try {
      const classModel = new Class();
      const newClass = await classModel.createClass(school_id, no
...
```

### Arquivo: `controllers\collectionController.js`

```js
const Collection = require('../models/collectionModel');

const collectionController = {
    // Criar um novo registro de coleta para um aluno
    async create(req, res) {
        const { id_student, class_id, data_coleta, peso1, altura1, peso2, altura2 } = req.body;

        try {
         
...
```

### Arquivo: `controllers\schoolController.js`

```js
const School = require('../models/schoolModel');

const schoolController = {
  // Criar uma nova escola
  async create(req, res) {
    const { nome, endereco, bairro, cidade, estado, telefone } = req.body;

    try {
      const schoolModel = new School();
      const newSchool = await scho
...
```

### Arquivo: `controllers\studentController.js`

```js
const Student = require('../models/studentModel');

const studentController = {
  // Criar aluno
  async create(req, res) {
    const { nome_completo, data_nascimento, sexo, ATR, class_id } = req.body;

    try {
      const studentModel = new Student();
      const newStudent = await stude
...
```

### Arquivo: `controllers\userController.js`

```js
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const userController = {
  // Registro de novo usuário
  async register(req, res) {
    const { email, password } = req.body;

    try {
      // Hash da senha
      const passwordHash = await bcrypt.hash(passw
...
```

## Pasta: `db`


### Arquivo: `db\createTables.js`

```js
const getClient = require('../config/db');

const createTables = async () => {
  const client = getClient();

  const query = `
    CREATE TABLE IF NOT EXISTS schools (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      endereco VARCHAR(255) NOT NULL,
      bairro VARCHAR
...
```

## Pasta: `models`


### Arquivo: `models\classModel.js`

```js
const getClient = require('../config/db');

class Class {
  constructor() {
    this.client = getClient();
    this.client.connect();
  }

  // Criar uma nova classe
  async createClass(school_id, nome, turno) {
    const query = `
      INSERT INTO classes (school_id, nome, turno) 
    
...
```

### Arquivo: `models\collectionModel.js`

```js
const getClient = require('../config/db');

class Collection {
  constructor() {
    this.client = getClient();
    this.client.connect();
  }

  // Criar um novo registro de coleta para um aluno
  async createCollection(id_student, class_id, data_coleta, peso1, altura1, peso2, altura2) {

...
```

### Arquivo: `models\schoolModel.js`

```js
const getClient = require('../config/db');

class School {
  constructor() {
    this.client = getClient();
    this.client.connect();
  }

  // Criar uma nova escola
  async createSchool(nome, endereco, bairro, cidade, estado, telefone) {
    const query = `
      INSERT INTO schools (no
...
```

### Arquivo: `models\studentModel.js`

```js
const getClient = require('../config/db');

class Student {
  constructor() {
    this.client = getClient();
    this.client.connect();
  }

  // Criar um novo aluno
  async createStudent(nome_completo, data_nascimento, sexo, ATR, class_id) {
    const query = `
      INSERT INTO students
...
```

### Arquivo: `models\userModel.js`

```js
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
  
...
```

## Pasta: `routes`


### Arquivo: `routes\classRoutes.js`

```js
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Buscar classes por school_id
router.get('/search', classController.searchBySchoolId);

// Criar uma nova classe
router.post('/', classController.create)
...
```

### Arquivo: `routes\collectionRoutes.js`

```js
const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

// Buscar registros de coleta por data e turma
router.get('/search', collectionController.getByDateAndClass);

// Criar um novo registro de coleta
...
```

### Arquivo: `routes\schoolRoutes.js`

```js
const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

// Buscar escolas por nome, endereço, cidade, estado
router.get('/search', schoolController.search);

// Criar uma nova escola
router.post('/', schoolCon
...
```

### Arquivo: `routes\studentRoutes.js`

```js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Buscar alunos por nome e data de nascimento
router.get('/search', studentController.search);

// Criar um novo aluno
router.post('/', studentControl
...
```

### Arquivo: `routes\tableRoutes.js`

```js
const express = require('express');
const router = express.Router();
const createTables = require('../db/createTables.js');

// Rota para criar todas as tabelas
router.get('/create-tables', async (req, res) => {
  try {
    await createTables();
    res.status(200).send('Tabelas criadas com 
...
```

### Arquivo: `routes\userRoutes.js`

```js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para registro de usuário
router.post('/register', userController.register);

// Rota para login de usuário
router.post('/login', userController.login
...
```
