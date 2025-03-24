import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ListingService } from 'src/infrastructure/services/ListingService';
import { CreateListingDto } from 'src/application/dtos/CreateListingDto';
import { Listing } from 'src/domain/entities/Listing';
import { UpdateListingDto } from 'src/application/dtos/UpdateListingDto';

@Controller('listings')
export class ListingController {
  constructor(private readonly createListingUseCase: ListingService) {}

  // Endpoint to create a listing
  @Post()
  async createListing(
    @Body() createListingDto: CreateListingDto,
  ): Promise<Listing> {
    return this.createListingUseCase.create(createListingDto);
  }

  // Endpoint to fetch all listings
  @Get()
  async getAllListings(): Promise<Listing[]> {
    return this.createListingUseCase.findAll();
  }

  // Endpoint to get a listing by ID
  @Get(':id')
  async getListingById(@Param('id') id: string): Promise<Listing> {
    return this.createListingUseCase.findById(id);
  }

  // Endpoint to update a listing by ID
  @Put(':id')
  async updateListing(
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingDto,
  ): Promise<Listing> {
    return this.createListingUseCase.update(id, updateListingDto);
  }

  @Delete(':id')
  async deleteListing(@Param('id') id: string): Promise<boolean> {
    return this.createListingUseCase.delete(id);
  }

  // Endpoint to add a review to a listing
  @Post(':listingId/review')
  async addReview(
    @Param('listingId') listingId: string,
    @Body() reviewDto: { userId: string; comment: string; rating: number },
  ) {
    const { userId, comment, rating } = reviewDto;
    return this.createListingUseCase.addReview(
      listingId,
      userId,
      comment,
      rating,
    );
  }
}
