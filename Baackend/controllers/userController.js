const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Contrôleur pour créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    const { nom, email, password, role } = req.body;

    try {
        // Vérification si l'utilisateur existe déjà
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // Création d'un nouvel utilisateur
        user = new User({ nom, email, password, role });

        // Hachage du mot de passe
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Enregistrement de l'utilisateur dans la base de données
        await user.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
    }
};

// Contrôleur pour récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
};

// Contrôleur pour récupérer un utilisateur par son ID
exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur.' });
    }
};

// Contrôleur pour mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
    }
};

// Contrôleur pour supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
    }
};
