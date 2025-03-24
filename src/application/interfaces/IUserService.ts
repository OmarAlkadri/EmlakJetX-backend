import { RegisterInputDto } from '../dtos';

// IServiceInterface.ts
export interface IUserService {
  createUser(dto: RegisterInputDto): Promise<void>;
}
