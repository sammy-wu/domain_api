import { SavedListing } from '../models/SavedListing';
import { User } from '../models/User';
import { Listing } from '../models/Listing';

export class SavedListingService {
  async createSavedListing(userId: number, listingId: number): Promise<SavedListing | null> {
    const user = await User.findOneBy({ id: userId });
    const listing = await Listing.findOneBy({ id: listingId });
    if (!user || !listing) return null;

    const savedListing = SavedListing.create({ user, listing });
    await savedListing.save();
    return savedListing;
  }

  async getSavedListingsByUser(userId: number): Promise<SavedListing[] | null> {
    const user = await User.findOneBy({ id: userId });
    if (!user) return null;

    return SavedListing.find({
      where: { user },
      relations: ['listing'],
    });
  }

  async deleteSavedListing(id: number): Promise<boolean> {
    const result = await SavedListing.delete(id);
    return result.affected !== 0;
  }

  async getUsersCountForListing(listingId: number): Promise<number> {
    return SavedListing.countBy({ listing: { id: listingId } });
  }
}
