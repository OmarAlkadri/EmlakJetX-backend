import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import {
  AuthResponse,
  LoginInput,
  RegisterInputDto,
} from 'src/application/dtos';
import { SignInUseCase } from 'src/application/use-cases/auth/SignInUseCase';
import { User } from 'src/domain/entities';
import { CurrentUser } from 'src/presentation/decorators/current-user.decorator';
import { Public } from 'src/presentation/decorators/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: SignInUseCase) {}

  @Public()
  @Mutation(() => AuthResponse)
  async register(@Args('data') registerInput: RegisterInputDto): Promise<AuthResponse> {
    return this.authService.register(registerInput);
  }
  
  @Public()
  @Mutation(() => AuthResponse)
  async login(@Args('data') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Query(() => User)
  //@UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
