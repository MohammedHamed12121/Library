const mongoose = require('mongoose');

const bookScheme = new mongoose.Schema({
    
    title: String,
    author: String
})

const Book = mongoose.model('Book', bookScheme);

module.exports = Book;

// isbn : string,
    // bookTitle: string,
    // bookAuthor: string,
    // yearOfPublication: string,
    // publisher: string,
    // imageURLS: string,
    // imageURLM: string,
    // imageURLL: string