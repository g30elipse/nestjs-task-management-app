import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';



@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { email, password } = authCredentialsDto;
        const user = await this.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user.email;
        }
        return null;
    }


    async createUser(authCredentialsDto: AuthCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ email, password: hashedPassword });
        return this.save(user);
    }

}