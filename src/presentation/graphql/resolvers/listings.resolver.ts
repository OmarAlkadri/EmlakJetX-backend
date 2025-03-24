import {
  Args,
  Mutation,
  Resolver,
  Query,
  Context,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CreateListingDto } from 'src/application/dtos';
import { ListingsWithPagination } from 'src/application/dtos/listing.response';
import { UpdateListingDto } from 'src/application/dtos/UpdateListingDto';
import { ListingService } from 'src/infrastructure/services/ListingService';
import { Listing, ListingDocument } from 'src/domain/entities';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { FilterQuery, Types } from 'mongoose';
import { Public } from '../../../presentation/decorators/public.decorator';
import {  UsePipes, ValidationPipe } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Resolver(() => Listing)
export class ListingsResolver {
  constructor(private listingsService: ListingService) {}

@Query(() => ListingsWithPagination)
async paginatedListings(
  @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  @Args('rooms', { nullable: true }) rooms?: number,
  @Args('userId', { nullable: true }) userId?: string,
  @Args('city', { nullable: true }) city?: string,
  @Args('priceMin', { nullable: true }) priceMin?: number,
  @Args('priceMax', { nullable: true }) priceMax?: number,
  @Args('startDate', { nullable: true }) startDate?: Date,
  @Args('endDate', { nullable: true }) endDate?: Date
) {
  const filter: FilterQuery<ListingDocument> = {};

  if (city) filter.city = city;
  if (rooms) filter.rooms = rooms;
  if (userId) filter.userId = new Types.ObjectId(userId);

    const priceFilter: Record<string, number> = {};

    if (priceMin !== undefined &&priceMin !== null && !isNaN(priceMin)) priceFilter.$gte = priceMin;
    if (priceMax !== undefined &&priceMax !== null && !isNaN(priceMax)) priceFilter.$lte = priceMax;

    if (Object.keys(priceFilter).length > 0) {
      filter.price = { ...priceFilter };
    }
  
    if (startDate!=null) filter.DateofPublication = { $gte: startDate };
    if (endDate!=null) {
      if (filter.DateofPublication) {
        filter.DateofPublication = { ...filter.DateofPublication, $lte: endDate };
      } else {
        filter.DateofPublication = { $lte: endDate };
      }
    }

  return this.listingsService.findListingsWithPagination(filter, page, limit);
}

@Query(() => ListingsWithPagination)
async searchListings(
  @Args('page', { defaultValue: 1 }) page: number,
  @Args('limit', { defaultValue: 10 }) limit: number,
  @Args('title', { nullable: true }) title?: string,
  @Args('userId', { nullable: true }) userId?: string,
  @Args('city', { nullable: true }) city?: string,
  @Args('priceMin', { nullable: true }) priceMin?: number,
  @Args('priceMax', { nullable: true }) priceMax?: number,
  @Args('startDate', { nullable: true }) startDate?: Date,
  @Args('endDate', { nullable: true }) endDate?: Date
) {
  const filter: any = {};

  if (title) filter.title = { $regex: title, $options: 'i' };
  if (city) filter.city = city;
  if (userId) filter.userId = new Types.ObjectId(userId);
  if (priceMin) filter.price = { $gte: priceMin };
  if (priceMax) filter.price = { ...filter.price, $lte: priceMax };

  if (startDate) filter.DateofPublication = { $gte: startDate };
  if (endDate) {
    if (filter.DateofPublication) {
      filter.DateofPublication = { ...filter.DateofPublication, $lte: endDate };
    } else {
      filter.DateofPublication = { $lte: endDate };
    }
  }

  return this.listingsService.findListingsWithPagination(filter, page, limit);
}

  @Mutation(() => Listing)
  //  @UseGuards(GqlAuthGuard)
  async createListing(@Args('data') data: CreateListingDto) {
    return this.listingsService.create(data);
  }

  @Query(() => [Listing])
  async getAllListings() {
    return this.listingsService.findAll();
  }

  @Query(() => Listing, { nullable: true })
  async getListing(@Args('id') id: string) {
    return this.listingsService.findById(id);
  }

  @Mutation(() => Listing)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateListing(
    @Args('_id', { type: () => String }) _id: string,
    @Args('data') data: UpdateListingDto,
  ): Promise<Listing> {
    return this.listingsService.update(_id, data);
  }

  @Mutation(() => Boolean)
  async deleteListing(@Args('id') id: string) {
    return this.listingsService.delete(id);
  }

  @Mutation(() => Listing)
  async addReview(
    @Args('listingId') listingId: string,
    @Args('comment') comment: string,
    @Args('rating') rating: number,
    @Context() ctx,
  ) {
    return this.listingsService.addReview(
      listingId,
      ctx.req.user.userId,
      comment,
      rating, 
    );
  }

  @Mutation(() => Listing)
  async removeReview(
    @Args('listingId') listingId: string,
    @Args('reviewId') reviewId: string,
  ) {
    return this.listingsService.removeReview(listingId, reviewId);
  }

  
  @ResolveField(() => Int, { nullable: true })
  averageRating(@Parent() listing: Listing): number {
    if (!listing.reviews || listing.reviews.length === 0) return 0;
    const total = listing.reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    return total / listing.reviews.length;
  }
}
