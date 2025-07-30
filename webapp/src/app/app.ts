import {Component, OnInit, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {KeycloakService} from './services/keycloak.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('webapp');

  constructor(private router: Router, private keycloakService: KeycloakService) {
  }

  ngOnInit() {
    this.keycloakService.init()
      .then(() => {
        console.log('Keycloak initialized successfully');
      })
      .catch(error => {
        console.error('Error initializing Keycloak', error);
      });
  }


  goToLanding() {
    this.router.navigate(['/']);
  }

}
