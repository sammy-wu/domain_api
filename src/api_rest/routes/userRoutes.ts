import express from 'express';
import { createUser, deleteUser, getUserById, updateUser } from '../controllers/UserController';
import { body } from 'express-validator';
import { validationMiddleware } from '../middlewares/validationMiddleware';
const router = express.Router();

// Validation rules for creating a user
const userValidation = [
  body('name').notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Valid email is required.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
];

// Validation rules for updating a user
const updateUserValidation = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty.'),
  body('email').optional().isEmail().withMessage('Valid email is required.'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
];

// CRUD operations
router.post('/', userValidation, validationMiddleware, createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUserValidation, validationMiddleware, updateUser);
router.delete('/:id', deleteUser);

export default router;
