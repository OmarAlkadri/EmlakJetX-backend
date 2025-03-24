/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IRepository } from '../../domain/repositories/IRepository';
import { RegisterInputDto } from '../../application/dtos';
import { User } from 'src/domain/entities';
import { IUser, UserDocument } from 'src/domain/entities/User';

@Injectable()
export class UserRepository implements IRepository<User> {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }
    //constructor(@InjectConnection('users') private connection: Connection) {}
    //constructor(@InjectModel(Cat.name, 'cats') private catModel: Model<Cat>) {}

    async singIn(username: string): Promise<User | null> {
        const result = this.userModel.findOne({ email: username }).exec();
        return result
    }

    async findOne(): Promise<User | null> {
        return this.userModel
            .findOne({ _id: 1 }).exec();
    }

      async findById(id: string) {
        const user = await this.userModel.findById(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
      }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async create(createCatDto: any): Promise<User | undefined> {
        try {
            const createdUser = await this.userModel.create(createCatDto); // Correct way to create a document
            createdUser.save()
            return createdUser;
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    async addFavorite(userId: string, listingId: string) {
        return this.userModel.findByIdAndUpdate(
          userId,
          { $addToSet: { favorites: listingId } },
          { new: true },
        );
      }
      
      async removeFavorite(userId: string, listingId: string) {
        return this.userModel.findByIdAndUpdate(
          userId,
          { $pull: { favorites: listingId } },
          { new: true },
        );
      }
      
      async getFavorites(userId: string) {
        return this.userModel.findById(userId).populate('favorites');
      }
      
}