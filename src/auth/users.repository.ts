import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {


    createUser(authCredentialsDto: AuthCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const user = this.create({ email, password });
        return this.save(user);
    }

}