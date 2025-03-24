// AggregateRootName.ts
import { User } from '../entities/User';
import { Email } from '../value-objects/Email';

export class UserAggregate {
    private readonly user: User;
    private readonly email: Email;

    constructor(user: User, email: Email) {
        this.user = user;
        this.email = email;
    }

    getUser(): User {
        return this.user;
    }

    getEmail(): Email {
        return this.email;
    }
}
