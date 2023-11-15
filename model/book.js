const mongoose = require('mongoose');

// Define the book schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

// Create the Book model
const Book = mongoose.model('Book', bookSchema);

// Export the model for use in other files
module.exports = Book;
