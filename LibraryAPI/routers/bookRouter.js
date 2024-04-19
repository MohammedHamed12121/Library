const express = require('express');
const router = express.Router();

const books = [];

// in-memory list of book
router.get('/', (req,res) => {
    res.status(200).json(books)
})
.get('/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('Book not found');
  }
  res.json(book);
})
.post('/', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).send('Missing title or author');
  }

  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).send(newBook);
})
.put('/:id', (req,res)=> {
  const { title, author } = req.body;
  const book = books.find(b => b.id == parseInt(req.params.id));
  if(!book){
    return res.status(404).send('Book not found');
  }
  book.title = title || book.title;
  book.author = author || book.author;
  res.json(book);
})
.delete('/:id', (req,res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if(bookIndex === -1){
    return res.status(404).send('Book not found');
  }
  books.splice(bookIndex,1);
  res.status(204).send();
})

module.exports = router