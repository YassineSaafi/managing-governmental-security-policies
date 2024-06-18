const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors'); // Import du middleware cors
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profile');
const userr = require('./routes/userResponse');
const questionRoutes = require('./routes/QuestionRoute');
const policy = require ('./routes/Poulicy')

// Initialisation de l'application Express
const app = express();

// Configuration des variables d'environnement
dotenv.config();

// Middleware pour parser le corps des requêtes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuration de la connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {}).then(() => {
    console.log('Connexion à la base de données MongoDB établie.');
}).catch(err => {
    console.error('Erreur lors de la connexion à la base de données MongoDB :', err);
});

// Configuration de Passport.js
require('./config/passport')(passport);

// Middleware Passport
app.use(passport.initialize());

// Utilisation du middleware cors
app.use(cors()); // Cette ligne remplace votre configuration manuelle des en-têtes CORS

// Import des routes
// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/res', userr);
app.use('/api/question', questionRoutes);
app.use ('/api/policy',policy)

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Une erreur est survenue sur le serveur.');
});

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur !');
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}.`);
});

module.exports = app;
