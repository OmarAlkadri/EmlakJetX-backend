
import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateListingDto, ReviewInput } from './CreateListingDto';

@InputType()
export class UpdateListingDto extends PartialType(CreateListingDto) {
  @Field(() => [ReviewInput], { nullable: true })
  reviews?: ReviewInput[];
}