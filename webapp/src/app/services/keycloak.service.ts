import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak!: Keycloak;
  private isInitialized = false;

  constructor(private router: Router) {
  }

  init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'dev-realm',
        clientId: 'kuala'
      });

      this.keycloak.init({
        onLoad: 'check-sso',
        checkLoginIframe: true,
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      }).then(authenticated => {
        this.isInitialized = true;
        if (authenticated) {
          this.router.navigate(['/home']);
        }
        resolve(authenticated);
      }).catch(err => {
        reject(err);
      });
    });
  }

  login(): void {
    if (!this.isInitialized) {
      console.error('Keycloak not initialized. Please ensure init() is called and completed.');
      return;
    }

    this.keycloak.login({
      redirectUri: window.location.origin + '/home'
    });
  }

  logout(): void {
    this.keycloak.logout({
      redirectUri: window.location.origin + '/pricing'
    });

  }

  isLoggedIn(): boolean {
    return !!this.keycloak?.authenticated;
  }

  getUsername(): string | undefined {
    return this.keycloak?.tokenParsed?.['preferred_username'] as string;
  }

  getToken(): Promise<string> {
    return this.keycloak.updateToken(10).then(() => this.keycloak.token!);
  }
}
