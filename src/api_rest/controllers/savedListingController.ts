import { Request, Response } from 'express';
import { SavedListingService } from '../../services/savedListingService';

const savedListingService = new SavedListingService();

export const createSavedListing = async (req: Request, res: Response) => {
  const { userId, listingId } = req.body;
  if (!userId || !listingId) {
    return res.status(400).json({ message: 'userId and listingId are required.' });
  }
  try {
    const savedListing = await savedListingService.createSavedListing(userId, listingId);
    if (!savedListing) throw new Error('User or Listing not found');
    res.status(201).json(savedListing);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getSavedListings = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }
  try {
    const savedListings = await savedListingService.getSavedListingsByUser(userId);
    if (!savedListings) throw new Error('User not found');
    res.json(savedListings);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteSavedListing = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid saved listing ID.' });
  }
  try {
    const success = await savedListingService.deleteSavedListing(id);
    if (!success) throw new Error('Saved Listing not found');
    res.json({ message: 'Saved Listing deleted' });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getUsersCountForListing = async (req: Request, res: Response) => {
  const listingId = Number(req.params.listingId);
  if (isNaN(listingId)) {
    return res.status(400).json({ message: 'Invalid listing ID.' });
  }
  try {
    const count = await savedListingService.getUsersCountForListing(listingId);
    res.json({ count });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
