import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PetCam';
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.authService.checkAuthenticated();
    if (!this.isAuthenticated) {
      await this.router.navigate(['/login']);
    }
  }

  async logout(): Promise<void> {
    this.authService.logout('/home');
  }
}
