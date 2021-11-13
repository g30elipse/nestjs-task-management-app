import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './auth.types';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService
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


    async signIn(authCredentialDto: AuthCredentialsDto) {
        const email = await this.userRepository.validateUserPassword(authCredentialDto);
        const payload: JwtPayload = { email };
        const accessToken = this.jwtService.sign(payload);
        if (!email) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return { accessToken };
    }
}
