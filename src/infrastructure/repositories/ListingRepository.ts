/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateListingDto } from '../../application/dtos';
import { UpdateListingDto } from '../../application/dtos/UpdateListingDto';
import { InjectModel } from '@nestjs/mongoose';
import { Listing, ListingDocument } from 'src/domain/entities/Listing';
import { FilterQuery, Model, Types } from 'mongoose';
import { IRepository } from '../../domain/repositories';
import { FileUpload } from 'graphql-upload-minimal';

@Injectable()
export class ListingRepository implements IRepository<Listing> {
  constructor(
    @InjectModel(Listing.name) private listingModel: Model<ListingDocument>,
  ) {}

  async create(data: CreateListingDto) {
    return this.listingModel.create({
      ...data,
      userId: new Types.ObjectId(data.userId), 
      reviews: data.reviews?.map(review => ({
        ...review,
        userId: new Types.ObjectId(review.userId)
      })),
    });
    }

  async findAll() {
    return this.listingModel.find();
  }

  async findByIdAndUpdate(listingId: string, update: object, options: object) {
    return this.listingModel.findByIdAndUpdate(listingId, update, options);
  }

  async findById(id: string): Promise<Listing> {
    try {
      const listing = await this.listingModel
        .findById(id)
        .populate('userId', 'name email')
        .exec();
        
      if (!listing) throw new NotFoundException('Listing not found');
      return listing;
    } catch (error) {
      throw new NotFoundException('Listing not found');
    }
  }
  
  async update(id: string, data: UpdateListingDto) {
    const updatedListing = await this.listingModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedListing) throw new NotFoundException('Listing not found');
    return updatedListing;
  }

  async delete(id: string) {
    const deleted = await this.listingModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Listing not found');
    return true;
  }

  async findListingsWithPagination(
    filter: FilterQuery<ListingDocument>,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;
  
    const [listings, totalCount] = await Promise.all([
      this.listingModel.find(filter).skip(skip).limit(limit).exec(),
      this.listingModel.countDocuments(filter)
    ]);
  
    return {
      listings,
      totalCount,
      totallistingCount: listings.length,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }
  
  async findListings(filter: FilterQuery<ListingDocument>) {
    return this.listingModel.find(filter).exec();
  }
  
  async removeReview(listingId: string, reviewId: string) {
    const updatedListing = await this.listingModel.findByIdAndUpdate(
      listingId,
      {
        $pull: {
          reviews: { _id: reviewId },
        },
      },
      { new: true },
    );
  
    if (!updatedListing) throw new NotFoundException('Listing not found');
    return updatedListing;
  }


  async deleteMany(): Promise<void> {
    await this.listingModel.deleteMany({});
  }
  
  async insertMany(listings: CreateListingDto[]): Promise<any[]> {
    return this.listingModel.insertMany(listings);
  }
  
}
