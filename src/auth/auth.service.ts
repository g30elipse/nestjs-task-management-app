import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
    ) { }

    async signUp(authCredentialDto: AuthCredentialsDto) {
        try {
            await this.userRepository.createUser(authCredentialDto);
        } catch (error) {
            if (error.code === '23505') { // duplicate email
                throw new ConflictException('Email already exists');
            }
            throw new InternalServerErrorException()
        }
    }
}
