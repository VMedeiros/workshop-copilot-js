### 4️⃣ **Lab 4: Deletando Livros** 🗑️

- **Objetivo**: Criar um método `DELETE` para remover livros da biblioteca.
- **O que você vai fazer**: Implementar a funcionalidade de deletar livros e testar a exclusão.

#### Passos:

1. No arquivo `controllers/BookController.js`, utilize o método `deleteBook`:
   ```javascript
   static async deleteBook(req, res) {
       const { id } = req.params;
       const book = await Book.findByPk(id);
       await book.destroy();
       res.status(204).send();
   }
   ```
2. Teste a exclusão de um livro usando o endpoint `DELETE /books/:id`.