// src/app/auth/keycloak.service.ts
import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak!: Keycloak;

  init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.keycloak = new Keycloak({
        url: 'http://localhost:8080/auth',
        realm: 'your-realm',
        clientId: 'your-client-id'
      });

      this.keycloak.init({
        onLoad: 'check-sso',
        checkLoginIframe: true,
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      }).then(authenticated => {
        resolve(authenticated);
      }).catch(err => {
        reject(err);
      });
    });
  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout({ redirectUri: window.location.origin });
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
