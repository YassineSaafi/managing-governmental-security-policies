const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

// Contrôleur pour l'inscription d'un nouvel utilisateur
exports.signup = async (req, res) => {
    const { nom, email, password, role } = req.body;

    try {
        // Vérification si l'utilisateur existe déjà
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // Création d'un nouvel utilisateur
        const newUser = new User({ nom, email, password, role });

        // Hachage du mot de passe
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        // Enregistrement de l'utilisateur dans la base de données
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
    }
};

// Contrôleur pour l'authentification de l'utilisateur
exports.login = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({ message: info.message });
        }

        req.login(user, { session: false }, async (err) => {
            if (err) {
                return next(err);
            }

            // Création du token JWT
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({ token, userId: user._id });
        });
    })(req, res, next);
};
