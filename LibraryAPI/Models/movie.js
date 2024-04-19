const mongoose = require('mongoose');

const movieScheme = new mongoose.Schema({
    show_id: String,
    author: String
})

const Book = mongoose.model('Book', bookScheme);

module.exports = Book;