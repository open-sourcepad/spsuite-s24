import { LoginOpt, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { environment } from '../environments/environment';

const googleLoginOptions: LoginOpt = {
    scope: 'email',
    hosted_domain: 'sourcepad.com',
    fetch_basic_profile: true
  }
  
  let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.google_client,googleLoginOptions)
    }
  ]);
  
  
  
  export function provideConfig() {
    return config;
  }