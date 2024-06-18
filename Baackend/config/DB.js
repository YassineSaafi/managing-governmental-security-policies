const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Configuration des variables d'environnement
dotenv.config();

// Fonction pour établir la connexion à la base de données
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useCreateIndex: true // Pour éviter les avertissements de dépréciation
        });
        console.log('Connexion à la base de données MongoDB établie.');
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données MongoDB :', error);
        process.exit(1); // Quitte le processus avec un code d'erreur
    }
};

module.exports = connectDB;
