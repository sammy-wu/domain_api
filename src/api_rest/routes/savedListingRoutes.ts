import express from 'express';
import {
  createSavedListing,
  deleteSavedListing,
  getSavedListings,
  getUsersCountForListing,
} from '../controllers/SavedListingController';
import { body } from 'express-validator';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const router = express.Router();

// Validation rules for creating a saved listing
const savedListingValidation = [
  body('userId').isInt().withMessage('userId must be an integer.'),
  body('listingId').isInt().withMessage('listingId must be an integer.'),
];

// CRUD operations
router.post('/', savedListingValidation, validationMiddleware, createSavedListing);
router.get('/user/:userId', getSavedListings);
router.delete('/:id', deleteSavedListing);
// get the number of users who have shortlisted a particular property
router.get('/count/:listingId', getUsersCountForListing);
export default router;
