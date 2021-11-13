import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    password: string;
}