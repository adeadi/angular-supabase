import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {
  constructor(private router: Router) { }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
