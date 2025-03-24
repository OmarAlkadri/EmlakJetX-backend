import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { UserRepository } from '../repositories';
import { ListingRepository } from '../repositories/ListingRepository';
import { ERoles } from 'src/shared/types';
import bcrypt from 'bcryptjs';

@Injectable()
export class SeederService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly listingRepository: ListingRepository,
  ) {}

  async seedDatabase() {
    const cleanPhoneNumber = (phone: string) => {
        return phone.replace(/[^\d\-\+]/g, '').slice(0, 15);
      };    
    console.log('✅ Seeding database...');

    //await this.userRepository.deleteMany();
    await this.listingRepository.deleteMany();
    console.log('✅ Cleared old data');
      const hashedPassword = await bcrypt.hash('12345678', 10);

/*    const users = Array.from({ length: 10 }, () => {
        const data = Object.values(ERoles)[Math.floor(Math.random() * Object.values(ERoles).length)];
        return {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: hashedPassword,
          phoneNumber: cleanPhoneNumber(faker.phone.number()),
          registrationNumber: faker.string.uuid(),
          EUserType: data,
          ERoles: [data,Object.values(ERoles)[Math.floor(Math.random() * Object.values(ERoles).length)]],
        };
      });
      */

    //const insertedUsers = await this.userRepository.insertMany(users);
    console.log('✅ Users inserted'); 

    const listings = Array.from({ length: 50 }, () => ({
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      price: faker.number.int({ min: 50000, max: 500000 }),
      city: faker.location.city(),
      district: faker.location.state(),
      DateofPublication: faker.date.past(),
      rooms: faker.number.int({ min: 1, max: 6 }),
      area: faker.number.float({ min: 50, max: 300 }),
      images: [faker.image.url(), faker.image.url()],
      userId: '67e1df75775f8fbe603d88fd',
      reviews: [],
    }));

    await this.listingRepository.insertMany(listings);
    console.log('✅ Listings inserted');
  }
}
