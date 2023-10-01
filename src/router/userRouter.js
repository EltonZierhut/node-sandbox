const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/users', authController.VerifyJWT, userController.createUser);
router.get('/users', authController.VerifyJWT, userController.getALLUsers);
router.get('/users/:id', authController.VerifyJWT, userController.getUserById);
router.put('/users/:id', authController.VerifyJWT, userController.updateUser);
router.delete('/users/:id', authController.VerifyJWT, userController.deleteUser);

module.exports = router;