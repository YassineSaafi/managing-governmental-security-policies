const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const UserResponse = require('../models/user-response');

// Middleware pour vérifier l'authentification
router.use(authMiddleware);

// Endpoint pour obtenir toutes les réponses utilisateur
router.get('/get', async (req, res) => {
    try {
        const userResponses = await UserResponse.find({ userId: req.user.userId });
        res.status(200).json(userResponses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des réponses utilisateur.' });
    }
});

// Endpoint pour ajouter une réponse utilisateur
router.post('/add', async (req, res) => {
    try {
        const { userId, questionId, answerIndex } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'Le champ userId est requis.' });
        }
        const newUserResponse = new UserResponse({ userId, questionId, answerIndex });
        await newUserResponse.save();
        res.status(201).json(newUserResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de la réponse utilisateur.' });
    }
});

// Endpoint pour supprimer une réponse utilisateur
router.delete('/delete/:userResponseId', async (req, res) => {
    try {
        const userResponseId = req.params.userResponseId;
        await UserResponse.findByIdAndDelete(userResponseId);
        res.status(200).json({ message: 'Réponse utilisateur supprimée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la réponse utilisateur.' });
    }
});

// Endpoint pour obtenir des statistiques sur les réponses confirmées
router.get('/statistics', async (req, res) => {
    try {
        // Implémentez votre logique de récupération des statistiques ici
        res.status(200).json({ message: 'Statistiques des réponses confirmées.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des statistiques.' });
    }
});

// Endpoint pour obtenir des réponses non confirmées
router.get('/getUnconfirmed', async (req, res) => {
    try {
        const unconfirmedResponses = await UserResponse.find({ confirmation: 'nonconfirmé' });
        res.status(200).json(unconfirmedResponses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des réponses non confirmées.' });
    }
});

// Endpoint pour confirmer une réponse utilisateur
router.put('/confirm/:questionId', async (req, res) => {
    try {
        // Implémentez votre logique de confirmation de réponse utilisateur ici
        res.status(200).json({ message: 'Réponse utilisateur confirmée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la confirmation de la réponse utilisateur.' });
    }
});

module.exports = router;
