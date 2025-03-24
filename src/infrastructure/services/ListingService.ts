import { Injectable } from '@nestjs/common';
import { CreateListingDto } from '../../application/dtos/CreateListingDto';
import { UpdateListingDto } from '../../application/dtos/UpdateListingDto';
import { Listing, ListingDocument } from '../../domain/entities/Listing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ListingRepository } from '../repositories/ListingRepository';
import { FilterQuery } from 'mongoose';
import sanitize from 'mongo-sanitize';

@Injectable()
export class ListingService {
  constructor(
    private readonly listingRepository: ListingRepository,
  ) {}

  async create(createListingDto: CreateListingDto): Promise<Listing> {
    try {
      const sanitizedData = sanitize(createListingDto);
      return await this.listingRepository.create(sanitizedData);
    } catch (error) {
      throw new BadRequestException('Failed to create listing');
    }
  }

  async findAll(): Promise<Listing[]> {
    try {
      return await this.listingRepository.findAll();
    } catch (error) {
      throw new BadRequestException('Failed to fetch listings');
    }
  }

  async findById(id: string): Promise<Listing> {
    try {
      const sanitizedId = sanitize(id);
      const listing = await this.listingRepository.findById(sanitizedId);
      if (!listing) throw new NotFoundException('Listing not found');
      return listing;
    } catch (error) {
      throw new NotFoundException('Listing not found');
    }
  }

  async findListingsWithPagination(
    filter: FilterQuery<ListingDocument>,
    page: number,
    limit: number,
  ) {
    try {
      return await this.listingRepository.findListingsWithPagination(
        filter,
        page,
        limit,
      );
    } catch (error) {
      throw new NotFoundException('Listing not found');
    }
  }

  async findListings(filter: FilterQuery<ListingDocument>) {
    const sanitizedFilter = sanitize(filter);
    return this.listingRepository.findListings(sanitizedFilter);
  }

  async update(
    id: string,
    updateListingDto: UpdateListingDto,
  ): Promise<Listing> {
    try {
      const sanitizedId = sanitize(id);
      const sanitizedData = sanitize(updateListingDto);
      const updatedListing = await this.listingRepository.update(
        sanitizedId,
        sanitizedData,
      );
      if (!updatedListing)
        throw new NotFoundException('Listing not found for update');
      return updatedListing;
    } catch (error) {
      throw new NotFoundException('Listing not found for update');
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const sanitizedId = sanitize(id);
      const deleted = await this.listingRepository.delete(sanitizedId);
      if (!deleted)
        throw new NotFoundException('Listing not found for deletion');
      return true;
    } catch (error) {
      throw new NotFoundException('Listing not found for deletion');
    }
  }

  async addReview(
    listingId: string,
    userId: string,
    comment: string,
    rating: number,
  ) {
    return this.listingRepository.findByIdAndUpdate(
      sanitize(listingId), 
      {
        $push: {
          reviews: { 
            userId: sanitize(userId),
            comment: sanitize(comment),
            rating,
          },
        },
      },
      { new: true },
    );
  }

  async removeReview(listingId: string, reviewId: string) {
    try {
      return await this.listingRepository.removeReview(
        sanitize(listingId),
        sanitize(reviewId),
      );
    } catch (error) {
      throw new NotFoundException('Review or Listing not found');
    }
  }  
}
