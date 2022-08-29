const express = require('express');

const app = express();
const petFixture = require('./petFixture.json')

app.get('/pets', (req, res) => {
    res.json(petFixture)
  });

  app.get('/pets/:id', (req, res) => {
    const petId = req.params.id
    const petData = petFixture.filter(pet => pet.PetID.toString() === petId)
    res.json(petData)
  });

app.listen(3001, () => console.log('Example app is listening on port 3001.'));