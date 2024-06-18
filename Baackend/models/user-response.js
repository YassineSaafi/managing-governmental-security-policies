const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Référence vers le modèle User
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question', // Référence vers le modèle Question
        required: true
    },
    answerIndex: {
        type: Number,
        required: true
    },
    confirmation: {
        type: String, // Le type doit être String pour stocker les valeurs 'nonconfirmé', 'accepté' ou 'refusé'
        enum: ['nonconfirmé', 'accepté', 'refusé'], // Définir une énumération pour les valeurs autorisées
        default: 'nonconfirmé', // Définir la valeur par défaut
        required: true
    }
});

module.exports = mongoose.model('UserResponse', userResponseSchema);
