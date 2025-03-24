import { ObjectType, Field, Int,  ID, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './User';

@Schema()
@ObjectType()
export class Listing extends Document{
  @Field(() => ID)
  declare readonly _id: Types.ObjectId;
  
  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field()
  description: string;

  @Prop({ required: true })
  @Field(() => Float)
  price: number;

  @Prop({ required: true })
  @Field()
  city: string;

  @Prop({ required: true })
  @Field()
  district: string;

  @Prop({ required: true })
  @Field(()=>Date)
  DateofPublication: Date;

  @Prop({ required: true })
  @Field(() => Int)
  rooms: number;

  @Prop({ required: true })
  @Field(() => Float)
  area: number;

  @Prop()
  @Field(() => [String], { nullable: true })
  images?: string[];

  @Prop({
    type: [{ userId: String, comment: String, rating: Number }],
    default: [],
  })
  @Field(() => [Review], { nullable: true })
  reviews?: Review[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  @Field(() => User)
  userId: Types.ObjectId;

  @Field(() => Float, { nullable: true })
  get averageRating(): number {
    if (!this.reviews || this.reviews.length === 0) return 0;
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / this.reviews.length;
  }
}

@ObjectType()
export class Review extends Document{
  @Field(() => ID) 
  userId: string;

  @Field()
  comment: string;

  @Field(() => Int)
  rating: number;
}

export type ListingDocument = Listing & Document;
export const ListingSchema = SchemaFactory.createForClass(Listing);
