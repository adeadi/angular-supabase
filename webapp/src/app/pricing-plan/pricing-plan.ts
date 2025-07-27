import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {KeycloakService} from '../services/keycloak.service';

@Component({
  selector: 'app-pricing-plan',
  imports: [],
  templateUrl: './pricing-plan.html',
  styleUrl: './pricing-plan.css'
})
export class PricingPlan {

  constructor(private router: Router,
              public keycloakService: KeycloakService) { }

  goToLogin(): void {
    this.keycloakService.login();
  }

}
