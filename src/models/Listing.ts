import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { SavedListing } from './SavedListing';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class Listing extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  address!: string;

  @Field()
  @Column()
  suburb!: string;

  @Field()
  @Column()
  state!: string;

  @Field()
  @Column({ type: 'int' })
  // @IsInt()
  // @Length(4, 4)
  postcode: number;

  @OneToMany(() => SavedListing, (savedListing) => savedListing.listing)
  savedListings: SavedListing[];
}
