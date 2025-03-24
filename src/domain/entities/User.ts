import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ERoles } from '../../shared/types/ERoles';
import { Listing } from './Listing';

export type UserDocument = User & Document;

export enum EMaritalStatus {
  Married = 1,
  Single,
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  registrationNumber?: string;
  phoneNumber?: string;
  ERoles?: ERoles[];
  EUserType: ERoles;
  favorites?: Types.ObjectId[];
}


@ObjectType()
@Schema({ timestamps: true })
export class User extends Document implements IUser {
  @Field(() => ID)
  declare readonly _id: Types.ObjectId;

  @Field()
  @Prop({ type: String, required: true, trim: true })
  name: string;


  @Field()
  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Field()
  @Prop({ type: String, required: true, trim: true, minlength: 8 })
  password: string;

  @Field({ nullable: true })
  @Prop({ type: String, trim: true })
  registrationNumber?: string;

  @Field({ nullable: true })
  @Prop({ type: String, trim: true, match: /^[0-9\-\+]{9,15}$/ })
  phoneNumber?: string;

  @Field(() => [ERoles], { nullable: true, defaultValue: [ERoles.Employee] })
  @Prop({ type: [String], enum: Object.values(ERoles) })
  ERoles?: ERoles[];

  @Field(() => ERoles, { defaultValue: ERoles.Employee })
  @Prop({ type: String, required: true, enum: Object.values(ERoles) })
  EUserType: ERoles;


  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Listing' }],
    default: [],
  })
  @Field(() => [ID], { nullable: true }) 
  favorites!: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
