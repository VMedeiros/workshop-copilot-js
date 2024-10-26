### 1️⃣ **Lab 1: Adicionando Livros à Biblioteca** 📚

- **Objetivo**: Usar o Copilot para adicionar novos livros à lista de forma rápida e eficiente.
- **O que você vai fazer**: Adicionar novos livros com o auxílio do Copilot e verificar a adição no sistema.

#### Passos:

1. Abra o arquivo `controllers/BookController.js`.
2. Use o método `addBook` para implementar a lógica de adição de um novo livro:
   ```javascript
   static async addBook(req, res) {
       const { title, author } = req.body;
       const newBook = await Book.create({ title, author });
       res.status(201).json(newBook);
   }
   ```
3. Teste a adição de um livro usando o endpoint `POST /books`.

