const express = require('express');
const Book = require('../model/book');

const app = express.Router();

// app.get('/books', (req, res) => {
//     let books = []
//     db.collection('book')
//         .find()
//         .forEach( book => books.push(book))
//         .then(() => {
//             res.status(200).json(books);
//         })
//         .catch(() => {
//             res.status(500).json({error: 'Could not fetch the doc'});
//         })

// });

app.get('/', (req, res) => {
    console.log("inside get");
    res.send('Welcome to my server!');
});

app.get('/books', (req, res) => {
    
    console.log("inside get");
    Book.find()
    .exec()
    .then((books) => {
        res.status(200).json(books);
    })
    .catch((err) => {
        res.status(500).json({ error: 'Could not fetch the doc' });
    });
})

app.get('/courses/:id', (req, res) => {
    console.log("inside get with id");
    //req.params.id
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
})

//validated code
app.post('/books', async (req, res) => {
    try {
      // Extract book data from the request body
      const { title, author, pages, genres, rating } = req.body;
  
      // Create a new Book instance
      const newBook = new Book({
        title,
        author,
        pages,
        genres,
        rating,
      });
  
      // Save the new book to the database
      await newBook.save();
  
      // Respond with the created book
      res.status(201).json(newBook);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Could not create the book' });
    }
  });

// app.post('/courses', (req, res) => {
//     console.log("inside post");
//     const result = validateCourse(req.body);
//     if( result.error ) return res.status(400).send(result.error.details[0].message);

//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course);
// })

app.put('/courses/:id', (req, res) =>{
    console.log("inside put");
    //Look up course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    //Validate
    const result = validateCourse(req.body);
    //Except using result.error, we can just use { error } --- Object distructor -- when only care about one elemt
    const { error } = validateCourse(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    //Update course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/courses/:id', ( req, res ) => {
    console.log("inside delete");
    //Look up course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    const index  = courses.indexOf(course);
    courses.splice(index, 1);

    //return
    res.send(course);

});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course,schema);
}

module.exports = app;