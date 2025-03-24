import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Listing } from '../../domain/entities/Listing';

@ObjectType()
export class ListingsWithPagination {
  @Field(() => [Listing])
  listings: Listing[];

  @Field(() => Int)
  totalPages: number;
  
  @Field(() => Int)
  totalCount: number;
  
  @Field(() => Int)
  totallistingCount: number;

  @Field(() => Int)
  currentPage: number;
}
