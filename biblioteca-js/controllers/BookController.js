const Book = require('../models/Book');

class BookController {
  /**
   * Adds a new book to the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async addBook(req, res) {
    try {
      const { title, author } = req.body;

      // Validate request body
      if (!title || !author) {
        return res.status(400).json({ error: 'Título e autor são obrigatórios' });
      }

      // Create new book
      const newBook = await Book.create({ title, author });

      // Respond with the created book
      res.status(201).json(newBook);
    } catch (error) {
      // Handle errors
      console.error('Erro ao adicionar livro:', error);
      res.status(500).json({ error: 'Erro ao adicionar livro' });
    }
  }

  /**
   * Updates an existing book in the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async updateBook(req, res) {
    try {
      const { id } = req.params;
      const { title, author } = req.body;

      // Validate request body
      if (!title || !author) {
        return res.status(400).json({ error: 'Título e autor são obrigatórios' });
      }

      // Find book by primary key
      const book = await Book.findByPk(id);
      if (!book) return res.status(404).json({ error: 'Livro não encontrado' });

      // Update book details
      book.title = title;
      book.author = author;
      await book.save();

      // Respond with the updated book
      res.status(200).json(book);
    } catch (error) {
      // Handle errors
      console.error('Erro ao atualizar livro:', error);
      res.status(500).json({ error: 'Erro ao atualizar livro' });
    }
  }

  /**
   * Retrieves all books from the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async getBooks(req, res) {
    try {
      // Fetch all books
      const books = await Book.findAll();

      // Check if books were found
      if (!books || books.length === 0) {
        return res.status(404).json({ error: 'Nenhum livro encontrado' });
      }

      // Respond with the list of books
      res.status(200).json(books);
    } catch (error) {
      // Handle errors
      console.error('Erro ao buscar livros:', error);
      res.status(500).json({ error: 'Erro ao buscar livros' });
    }
  }

  /**
   * Deletes a book from the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id);
      if (!book) return res.status(404).json({ error: 'Livro não encontrado' });

      await book.destroy();
      res.status(204).send();
    } catch (error) {
      // Handle errors
      console.error('Erro ao deletar livro:', error);
      res.status(500).json({ error: 'Erro ao deletar livro' });
    }
  }
}

module.exports = BookController;
