### 5️⃣ **Lab 5: Gerando Unit Tests** 🔧✅

- **Objetivo**: Gerar testes unitários automaticamente para validar o CRUD de livros.
- **O que você vai fazer**: Criar testes unitários para cada método do controlador com o Copilot.

#### Passos:

1. No arquivo `tests/BookController.test.js`, adicione testes para cada função:
   ```javascript
   test('Deve adicionar um livro', async () => {
       const response = await request(app).post('/books').send({ title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien' });
       expect(response.statusCode).toBe(201);
       expect(response.body.title).toBe('O Senhor dos Anéis');
   });
   ```
2. Execute os testes usando o comando:
   ```bash
   npm test
   ```