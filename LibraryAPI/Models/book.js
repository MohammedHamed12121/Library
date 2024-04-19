const mongoose = require('mongoose');

const bookScheme = new mongoose.Schema({
    title: String,
    author: String
})

const Book = mongoose.model('Book', bookScheme);

module.exports = Book;
