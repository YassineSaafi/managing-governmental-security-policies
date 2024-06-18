const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma utilisateur
const userSchema = new Schema({
    non: { // Modification de "nom" à "username"
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: { // Modification de "role" à "roles"
        type: [String],
        enum: ['SuperAdmin', 'Admin', 'ComplianceOfficer', 'PublicEntityRepresentative'],
        required: true
    }
});

// Création du modèle utilisateur
const User = mongoose.model('User', userSchema);

module.exports = User;
