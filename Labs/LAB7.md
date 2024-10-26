### 7️⃣ **Lab 7: Implementando Paginação** 📑

- **Objetivo**: Adicionar paginação para melhorar a visualização de grandes listas de livros.
- **O que você vai fazer**: Criar um método `GET` com suporte a paginação usando o Copilot.

#### Passos:

1. No método `getBooks`, implemente a lógica de paginação:
   ```javascript
   const page = req.query.page || 1;
   const limit = req.query.limit || 10;
   const offset = (page - 1) * limit;
   const books = await Book.findAndCountAll({ limit, offset });
   res.status(200).json({
       totalItems: books.count,
       totalPages: Math.ceil(books.count / limit),
       currentPage: page,
       books: books.rows,
   });
   ```
2. Teste a paginação usando o endpoint `GET /books?page=1&limit=10`.