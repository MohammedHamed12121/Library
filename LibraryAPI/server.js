const express = require('express');
const mongoose = require('mongoose');
const Book = require('./book');

const app = express();

mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then( () => console.log('Connected to database....'))
.catch( e => console.error('Couldn\'t connect to Mongodb...', e));

const port = 3000;
const books = [];

app.use(express.json());

// in-memory list of book
app.get('/books', (req,res) => {
    res.status(200).json(books)
})
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('Book not found');
  }
  res.json(book);
});
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).send('Missing title or author');
  }

  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).send(newBook);
});
// update
app.put('/books/:id', (req,res)=> {
  const { title, author } = req.body;
  const book = books.find(b => b.id == parseInt(req.params.id));
  if(!book){
    return res.status(404).send('Book not found');
  }
  book.title = title || book.title;
  book.author = author || book.author;
  res.json(book);
})
app.delete('/books/:id', (req,res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if(bookIndex === -1){
    return res.status(404).send('Book not found');
  }
  books.splice(bookIndex,1);
  res.status(204).send();
})

// mongodb book
app.get('/mbook', async (req,res)=> {
  const books = await Book.find();
  res.send(books);
})
app.post('/mbook', async (req,res) =>{
  let book = new Book({title: req.body.title, author: req.body.author});
  book = await book.save();
  res.send(book);
})
app.get('/mbook/:id', async (req,res) => {
  var book = await Book.findById(req.params.id);
  if(!book){
    return res.status(404).send('Book is not found');
  }
  res.json(book);
})
app.put('/mbook/:id', async (req,res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    author: req.body.author 
  }, {new: true});
  
  if(!book){
    return res.status(404).send('Book is not found');
  }
  res.send(book);
})
app.delete('/mbook/:id', async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if(!book){
    return res.status(404).send('Book is not found');
  }

  res.status(204).send();
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});