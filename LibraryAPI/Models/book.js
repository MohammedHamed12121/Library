const mongoose = require('mongoose');

const bookScheme = new mongoose.Schema({
    title: String,
    author: String
})

module.exports  = mongoose.model('Book', bookScheme);

