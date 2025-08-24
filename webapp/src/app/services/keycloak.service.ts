import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import Keycloak from 'keycloak-js';

declare global {
  interface Window {
    __env?: {
      KEYCLOAK_URL?: string;
      KEYCLOAK_REALM?: string;
      KEYCLOAK_CLIENT_ID?: string;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak!: Keycloak;
  private isInitialized = false;

  constructor(private router: Router) {
  }

  private getEnv(key: keyof NonNullable<Window['__env']>, fallback?: string): string {
    const value = window.__env?.[key] ?? fallback;
    if (!value) {
      console.error(`Missing runtime configuration for ${key}`);
    }
    return value ?? '';
  }

  init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const url = this.getEnv('KEYCLOAK_URL', 'http://localhost:30090');
      const realm = this.getEnv('KEYCLOAK_REALM', 'dev-realm');
      const clientId = this.getEnv('KEYCLOAK_CLIENT_ID', 'kuala');

      this.keycloak = new Keycloak({ url, realm, clientId });

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
      redirectUri: window.location.origin + '/home/plan/'
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
