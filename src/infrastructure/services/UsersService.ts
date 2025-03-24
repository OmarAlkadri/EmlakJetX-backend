import { UserRepository } from '../repositories';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterInputDto } from '../../application/dtos';
import { IUser, User } from '../../domain/entities/User';
import { Listing } from 'src/domain/entities';
import { Types } from 'mongoose';
import sanitize from 'mongo-sanitize';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userData: RegisterInputDto) {
    if (!userData.email || !userData.password) {
      throw new BadRequestException('Email and password are required.');
    }

    const sanitizedData = sanitize(userData);
    const existingUser = await this.userRepository.findByEmail(
      sanitizedData.email,
    );
    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }

    return await this.userRepository.create(sanitizedData);
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findById(sanitize(id));
    } catch (error) {
      throw new BadRequestException('Error fetching user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw new BadRequestException('Error fetching users');
    }
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(sanitize(email));
  }

  async addFavorite(userId: string, listingId: Types.ObjectId): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');
  
    const updatedUser = await this.userRepository.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: listingId } },
      { new: true }
    );
  
    if (!updatedUser) {
      throw new BadRequestException('Error adding to favorites');
    }
  
    return updatedUser;
  }
  

  async removeFavorite(userId: string, listingId: Types.ObjectId): Promise<User> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      const updatedUser = await this.userRepository.findByIdAndUpdate(
        userId,
        { $pull: { favorites: listingId } },
        { new: true } 
      );
  
      if (!updatedUser) {
        throw new BadRequestException('Error removing favorite');
      }
  
      return updatedUser;
    } catch (error) {
      throw new BadRequestException('Error removing favorite');
    }
  }
  

  async getFavorites(userId: string): Promise<Listing[]> {
    const user = await (
      await this.userRepository.findById(sanitize(userId))
    ).populate('favorites');
    if (!user) throw new NotFoundException('User not found');

    return user.favorites as unknown as Listing[];
  }

  async signIn(username: string, password: string): Promise<IUser | null> {
    try {
      const sanitizedUsername = sanitize(username);
      const sanitizedPassword = sanitize(password);

      const user = await this.userRepository.findByEmail(sanitizedUsername);
      if (!user || user.password !== sanitizedPassword) {
        throw new BadRequestException('Invalid credentials.');
      }
      return user;
    } catch (error) {
      throw new BadRequestException('Error signing in');
    }
  }

  async getFavorite(userId: string, listingId: Types.ObjectId): Promise<Types.ObjectId | undefined> {
    try {
      const user = await (await this.userRepository
        .findById(userId))
        .populate('favorites');
  
      if (!user) throw new NotFoundException('User not found');
  
      const favorite = user.favorites.find((data) => {
         if(data._id.toString() === listingId.toString() )
         return data 
      });
  
      if (favorite) {
        return favorite;
      }
  
      return undefined;
    } catch (error) {
      throw new BadRequestException('Error signing in');
    }
  }
  
  
  
  
}
