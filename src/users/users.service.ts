import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRole } from './enum/userRoles.enum';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
    }
  }
}
