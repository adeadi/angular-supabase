import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

export const AuthGuard: CanActivateFn = () => {
  const keycloak = inject(KeycloakService);
  if (keycloak.isLoggedIn()) {
    return true;
  } else {
    keycloak.login();
    return false;
  }
};
