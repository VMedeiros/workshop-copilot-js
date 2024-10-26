const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/dbConfig');
const Book = require('../models/Book');
const faker = require('faker');

// Sincroniza o banco de dados antes de todos os testes
beforeAll(async () => {
  await sequelize.sync();
});

// Limpa a tabela de livros após cada teste
afterEach(async () => {
  await Book.destroy({ where: {} });
});

// Função para gerar dados de livro
const generateBookData = () => ({
  title: faker.lorem.words(3),
  author: faker.name.findName(),
});

/**
 * Teste para adicionar um livro
 */
test('Deve adicionar um livro', async () => {
  const bookData = generateBookData();
  const response = await request(app).post('/books').send(bookData);
  expect(response.statusCode).toBe(201);
  expect(response.body.title).toBe(bookData.title);
  expect(response.body.author).toBe(bookData.author);
});

/**
 * Teste para atualizar um livro
 */
test('Deve atualizar um livro', async () => {
  const book = await Book.create(generateBookData());
  const updatedBookData = generateBookData();
  const response = await request(app).put(`/books/${book.id}`).send(updatedBookData);
  expect(response.statusCode).toBe(200);
  expect(response.body.title).toBe(updatedBookData.title);
  expect(response.body.author).toBe(updatedBookData.author);
});

/**
 * Teste para deletar um livro
 */
test('Deve deletar um livro', async () => {
  const book = await Book.create(generateBookData());
  const response = await request(app).delete(`/books/${book.id}`);
  expect(response.statusCode).toBe(204);
});

/**
 * Teste para retornar todos os livros
 */
test('Deve retornar todos os livros', async () => {
  const bookData = generateBookData();
  await Book.create(bookData);
  const response = await request(app).get('/books');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0].title).toBe(bookData.title);
  expect(response.body[0].author).toBe(bookData.author);
});

/**
 * Teste para adicionar um livro com dados inválidos
 */
test('Não deve adicionar um livro com dados inválidos', async () => {
  const response = await request(app).post('/books').send({
    title: '',
    author: '',
  });
  expect(response.statusCode).toBe(400);
  expect(response.body.error).toBe('Título e autor são obrigatórios');
});

/**
 * Teste para atualizar um livro com dados inválidos
 */
test('Não deve atualizar um livro com dados inválidos', async () => {
  const book = await Book.create(generateBookData());
  const response = await request(app).put(`/books/${book.id}`).send({
    title: '',
    author: '',
  });
  expect(response.statusCode).toBe(400);
  expect(response.body.error).toBe('Título e autor são obrigatórios');
});

/**
 * Teste para atualizar um livro que não existe
 */
test('Não deve atualizar um livro que não existe', async () => {
  const response = await request(app).put('/books/999').send({
    title: faker.lorem.words(3),
    author: faker.name.findName(),
  });
  expect(response.statusCode).toBe(404);
  expect(response.body.error).toBe('Livro não encontrado');
});

/**
 * Teste para deletar um livro que não existe
 */
test('Não deve deletar um livro que não existe', async () => {
  const response = await request(app).delete('/books/999');
  expect(response.statusCode).toBe(404);
  expect(response.body.error).toBe('Livro não encontrado');
});

/**
 * Teste para retornar todos os livros quando não há livros
 */
test('Deve retornar erro quando não há livros', async () => {
  const response = await request(app).get('/books');
  expect(response.statusCode).toBe(404);
  expect(response.body.error).toBe('Nenhum livro encontrado');
});/**
 * Teste para adicionar um livro com dados inválidos
 */
test('Não deve adicionar um livro com dados inválidos', async () => {
  const response = await request(app).post('/books').send({
    title: '',
    author: '',
  });
  expect(response.statusCode).toBe(400);
  expect(response.body.error).toBe('Título e autor são obrigatórios');
});

/**
 * Teste para atualizar um livro com dados inválidos
 */
test('Não deve atualizar um livro com dados inválidos', async () => {
  const book = await Book.create({ title: 'Harry Potter', author: 'J.K. Rowling' });
  const response = await request(app).put(`/books/${book.id}`).send({
    title: '',
    author: '',
  });
  expect(response.statusCode).toBe(400);
  expect(response.body.error).toBe('Título e autor são obrigatórios');
});

/**
 * Teste para atualizar um livro que não existe
 */
test('Não deve atualizar um livro que não existe', async () => {
  const response = await request(app).put('/books/999').send({
    title: 'Livro Inexistente',
    author: 'Autor Desconhecido',
  });
  expect(response.statusCode).toBe(404);
  expect(response.body.error).toBe('Livro não encontrado');
});

/**
 * Teste para deletar um livro que não existe
 */
test('Não deve deletar um livro que não existe', async () => {
  const response = await request(app).delete('/books/999');
  expect(response.statusCode).toBe(404);
  expect(response.body.error).toBe('Livro não encontrado');
});

/**
 * Teste para retornar todos os livros quando não há livros
 */
test('Deve retornar erro quando não há livros', async () => {
  const response = await request(app).get('/books');
  expect(response.statusCode).toBe(404);
  expect(response.body.error).toBe('Nenhum livro encontrado');
});