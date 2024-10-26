
### 2️⃣ **Lab 2: Atualizando a Lista de Livros** ✏️

- **Objetivo**: Criar um método `PUT` para atualizar as informações de um livro existente.
- **O que você vai fazer**: Implementar a lógica de atualização e testar com requisições.

#### Passos:

1. No arquivo `controllers/BookController.js`, utilize o método `updateBook` para implementar a atualização:
   ```javascript
   static async updateBook(req, res) {
       const { id } = req.params;
       const { title, author } = req.body;
       const book = await Book.findByPk(id);
       book.title = title;
       book.author = author;
       await book.save();
       res.status(200).json(book);
   }
   ```
2. Teste a atualização de um livro usando o endpoint `PUT /books/:id`.