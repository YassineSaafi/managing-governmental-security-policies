

const express = require('express');
const router = express.Router();


const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, (req, res) => {

  const user = req.user;


  res.json({ user });
});

module.exports = router;
