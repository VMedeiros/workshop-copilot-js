### 3️⃣ **Lab 3: Adicionando Filtros de Pesquisa** 🔍

- **Objetivo**: Criar um método para pesquisar livros por título ou autor.
- **O que você vai fazer**: Implementar filtros de pesquisa com o Copilot e buscar livros dinamicamente.

#### Passos:

1. No arquivo `controllers/BookController.js`, adicione a lógica de pesquisa:
   ```javascript
   static async getBooks(req, res) {
       const { title, author } = req.query;
       const where = {};
       if (title) where.title = { [Op.like]: `%${title}%` };
       if (author) where.author = { [Op.like]: `%${author}%` };
       const books = await Book.findAll({ where });
       res.status(200).json(books);
   }
   ```
2. Teste a pesquisa de livros usando o endpoint `GET /books?title=...&author=...`.