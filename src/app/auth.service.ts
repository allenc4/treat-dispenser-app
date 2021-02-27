import { Injectable } from '@angular/core';
import {OktaAuth} from '@okta/okta-auth-js';
import { environment } from '../environments/environment';
import {BehaviorSubject} from 'rxjs/index';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authClient = new OktaAuth({
    issuer: environment.OKTA_ISSUER,
    clientId: environment.OKTA_CLIENT_ID
  });

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { }

  async checkAuthenticated(): Promise<boolean> {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login(username: string, password: string): Promise<void> {
    const transaction = await this.authClient.signIn({username, password });

    if (transaction.status !== 'SUCCESS') {
      throw Error(`Failed to authenticate, status ${transaction.status}`);
    }

    this.isAuthenticated.next(true);
    this.authClient.session.setCookieAndRedirect(transaction.sessionToken);
  }

  async logout(redirect: string): Promise<void> {
    try {
      await this.authClient.signOut();
      this.isAuthenticated.next(false);
      this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}
