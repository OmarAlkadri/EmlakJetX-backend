import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { User } from '../../domain/entities';

@InputType()
export class ReviewInput {
  @Field(() => ID) 
  userId: string;

  @Field()
  comment: string;

  @Field(() => Int)
  rating: number;
}

@InputType()
export class CreateListingDto {
  @Field()
  title: string;

  
  @Field(() => Date)
  DateofPublication: Date;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  city: string;

  @Field()
  district: string;

  @Field(() => Int)
  rooms: number;

  @Field(() => Float)
  area: number;

  @Field(() => [String], { nullable: true })
  images?: string[];

  @Field(() => [ReviewInput], { nullable: true })
  reviews?: ReviewInput[];

  @Field(() => ID) 
  userId: string;
}
