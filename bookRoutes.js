const express = require('express');
const router = express.Router();
const User = require('./bookModel');

// retrieve all books
//http://localhost:8000/home/books/
router.get('/books', async (req, res) => {
    try {
        const books = await User.find();
        res.json(books);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// retrieve a specific book by ID
router.get('/books/:id', async (req, res) => {
    try {
        const book = await User.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error retrieving book:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Create a new book
//http://localhost:8000/home/books/
router.post('/books', async (req, res) => {
    try {
        const { title, author, description, publishedYear } = req.body;

        const newUser = new User({ title, author, description, publishedYear });
        await newUser.save();

        res.status(201).json({ message: 'Book created successfully', book: newUser });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a book by ID
router.put('/books/:id', async (req, res) => {
    try {
        const { title, author, description, publishedYear } = req.body;

        const book = await User.findByIdAndUpdate(
            req.params.id,
            { title, author, description, publishedYear },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({ message: 'Book updated successfully', book });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a book by ID
router.delete('/books/:id', async (req, res) => {
    try {
        const book = await User.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully', book });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
