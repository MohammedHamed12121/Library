const express = require('express');
const router = express.Router()

const Book = require('../Models/book');


// mongodb book
router.get('/', async (req,res)=> {
  const books = await Book.find();
  res.send(books);
})
.get('/:id', async (req,res) => {
  var book = await Book.findById(req.params.id);
  if(!book){
    return res.status(404).send('Book is not found');
  }
  res.json(book);
})
.post('/', async (req,res) =>{
  let book = new Book({title: req.body.title, author: req.body.author});
  book = await book.save();
  res.send(book);
})
.put('/:id', async (req,res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    author: req.body.author 
  }, {new: true});
  
  if(!book){
    return res.status(404).send('Book is not found');
  }
  res.send(book);
})
.delete('/:id', async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if(!book){
    return res.status(404).send('Book is not found');
  }

  res.status(204).send();
})

module.exports = router