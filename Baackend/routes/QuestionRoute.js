const express = require('express');
const router = express.Router();
const Question = require('../models/question'); // Assurez-vous d'importer le modèle Question
const mongoose = require('mongoose');

router.post('/ajout', (req, res) => {
    let data = req.body;
    let question = new Question({
        text: data.text,
        options: data.options,
        category: data.category
    }); 
    question.save()
        .then(saved => {
            console.log(req.body)
            res.status(200).send(saved);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.get('/all', (req, res) => {
    Question.find({})
        .then(questions => {
            res.status(200).send(questions);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.get('/byid/:id', (req, res) => {
    let id = req.params.id;
    Question.findOne({ _id: id })
        .then(question => {
            res.status(200).send(question);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.put('/update/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body;
    Question.findByIdAndUpdate({ _id: id }, data, { new: true })
        .then(updatedQuestion => {
            res.status(200).send(updatedQuestion);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    Question.findByIdAndDelete({ _id: id })
        .then(deletedQuestion => {
            if (!deletedQuestion) {
                return res.status(404).send("Question not found");
            }
            res.status(200).send("Question deleted successfully");
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;
