const express = require('express');
const BookController = require('../controllers/BookController');

const router = express.Router();

router.post('/', BookController.addBook);
router.put('/:id', BookController.updateBook);
router.get('/', BookController.getBooks);
router.delete('/:id', BookController.deleteBook);

module.exports = router;
