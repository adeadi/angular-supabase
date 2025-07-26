import { Component, signal } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('webapp');

  constructor(private router: Router) {
  }

  goToLanding()
  {
    this.router.navigate(['/']);
  }

}
