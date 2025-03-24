import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ReviewInput {
  @Field()
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

  @Field()
  userId: string;
}
