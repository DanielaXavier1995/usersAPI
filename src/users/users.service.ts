import { UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { UserRole } from './enum/userRoles.enum';

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
