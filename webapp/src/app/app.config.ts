import {
  ApplicationConfig, makeEnvironmentProviders,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNativeDateAdapter } from '@angular/material/core';
import {KeycloakService} from './services/keycloak.service';

export const appConfig: ApplicationConfig = {
  providers: [
    KeycloakService,
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    keycloakInitializer(),
    provideNativeDateAdapter()
  ]
};

function keycloakInitializer() {
  return makeEnvironmentProviders([
    {
      provide: KeycloakService,
      useClass: KeycloakService
    },
    {
      provide: 'KEYCLOAK_INITIALIZER',
      useFactory: (keycloak: KeycloakService) => {
        return () => keycloak.init();
      },
      deps: [KeycloakService]
    }
  ]);
}
