import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import {KeycloakService} from '../services/keycloak.service';

export const AuthGuard: CanActivateFn = () => {
  const keycloakService = inject(KeycloakService);
  if (keycloakService.isLoggedIn()) return true;
  keycloakService.login();
  return false;
};
