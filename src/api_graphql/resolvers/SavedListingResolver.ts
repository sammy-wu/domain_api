import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';
import { SavedListing } from '../../models/SavedListing';
import { SavedListingService } from '../../services/savedListingService';

const savedListingService = new SavedListingService();

@Resolver()
export class SavedListingResolver {
  @Mutation(() => SavedListing, { nullable: true })
  async createSavedListing(
    @Arg('userId', () => Int) userId: number,
    @Arg('listingId', () => Int) listingId: number
  ) {
    return await savedListingService.createSavedListing(userId, listingId);
  }

  @Query(() => [SavedListing], { nullable: true })
  async savedListings(@Arg('userId', () => Int) userId: number) {
    return await savedListingService.getSavedListingsByUser(userId);
  }

  @Mutation(() => Boolean)
  async deleteSavedListing(@Arg('id', () => Int) id: number) {
    return await savedListingService.deleteSavedListing(id);
  }

  @Query(() => Int)
  async usersCountForListing(@Arg('listingId', () => Int) listingId: number) {
    return await savedListingService.getUsersCountForListing(listingId);
  }
}
