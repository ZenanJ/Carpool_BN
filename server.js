//import express from "express";
const express = require('express');
const Joi = require('joi');

const app = express();
//enable middleware
app.use(express.json())
//Environment Variable
const port = process.env.port || 3000;

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/course/:id', (req, res) => {
    //req.params.id
    let course = courses.find(c => c.id === parseInt(req.parames.id));
    if(!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);
})

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body,schema);
    if( result.error ){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});