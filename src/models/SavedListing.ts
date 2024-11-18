import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique, BaseEntity } from 'typeorm';
import { User } from './User';
import { Listing } from './Listing';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity()
@Unique(['user', 'listing'])
export class SavedListing extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.savedListings, { onDelete: 'CASCADE' })
  user!: User;

  @Field(() => Listing)
  @ManyToOne(() => Listing, (listing) => listing.savedListings, { onDelete: 'CASCADE' })
  listing!: Listing;
}
