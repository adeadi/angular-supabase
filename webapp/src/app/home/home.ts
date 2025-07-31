import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {KeycloakService} from '../services/keycloak.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, RouterModule]
})
export class Home {
  constructor(private router: Router,
              private keycloakService: KeycloakService) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout(): void {
    this.keycloakService.logout();
  }
}
