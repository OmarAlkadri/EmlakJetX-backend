import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/repositories';
import { JwtServiceWrapper } from '../../../infrastructure/services/JwtServiceWrapper';
import { AuthResponse, LoginInput, RegisterInputDto } from '../../dtos';
import * as bcrypt from 'bcryptjs';
import { User } from '../../../domain/entities';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtServiceWrapper,
  ) {}

  async register(registerInput: RegisterInputDto): Promise<AuthResponse> {
    try {
      console.log('🔍 Checking if email exists:', registerInput.email);
  
      const existingUser = await this.userRepository.findByEmail(registerInput.email);
      if (existingUser) {
        console.error('❌ Email already exists:', registerInput.email);
        throw new Error('Email is already registered. Please use another email.');
      }
  
      console.log('✅ Email is available, proceeding with registration');
  
      const hashedPassword = await bcrypt.hash(registerInput.password, 10);
      console.log('🔑 Hashed password:', hashedPassword);
  
      const user = await this.userRepository.create({
        ...registerInput,
        password: hashedPassword,
      });
  
      if (!user) {
        console.error('❌ User creation failed in repository');
        throw new Error('User creation failed');
      }
  
      console.log('✅ User created successfully:', user);
  
      const payload = { id: user.id, email: user.email, role: user.EUserType };
      const accessToken = await this.jwtService.signAsync(payload);
  
      if (!accessToken) {
        console.error('❌ Failed to generate access token');
        throw new Error('Failed to generate access token');
      }
  
      console.log('🔑 Token generated:', accessToken);
  
      return { accessToken, user };
    } catch (error) {
      console.error('❌ Error during registration:', error);
      throw error;
    }
  }
  

  async login(data: LoginInput): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      accessToken: await this.jwtService.signAsync({ userId: user.id }),
      user: user,
    };
  }

  async execute(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.singIn(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.email, sub: user._id };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }
}
