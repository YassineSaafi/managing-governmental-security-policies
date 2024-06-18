const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware d'authentification
const authMiddleware = async (req, res, next) => {
    // Récupération du token d'authentification depuis le header Authorization
    const token = req.header('Authorization')?.split(' ')[1];

    // Vérification si le token est présent
    if (!token) {
        return res.status(401).json({ message: 'Token d\'authentification manquant.' });
    }

    try {
        // Vérification et décodage du token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Recherche de l'utilisateur dans la base de données
        const user = await User.findById(decoded.id);

        // Vérification si l'utilisateur existe
        if (!user) {
            return res.status(401).send('Accès refusé. Aucun utilisateur correspondant trouvé.');
        }

        // Attachez la charge utile décodée à l'objet de requête
        req.user = decoded;
        next();
    } catch (ex) {
        // Gestion des erreurs de token invalide
        res.status(400).send('Token invalide.');
    }
}

module.exports = authMiddleware;
