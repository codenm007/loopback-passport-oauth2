import { AuthenticationStrategy } from '@loopback/authentication';
import { RedirectRoute, RequestWithSession } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { UserRepository } from '../repositories';
export declare class SessionStrategy implements AuthenticationStrategy {
    userRepository: UserRepository;
    name: string;
    constructor(userRepository: UserRepository);
    /**
     * authenticate a request
     * @param request
     */
    authenticate(request: RequestWithSession): Promise<UserProfile | RedirectRoute | undefined>;
}
