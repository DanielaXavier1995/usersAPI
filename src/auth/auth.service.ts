import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UserRole } from 'src/users/enum/userRoles.enum';
import { User } from 'src/users/user.entity';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return await this.userRepository.createUser(createUserDto, UserRole.USER);
    }
  }
}
