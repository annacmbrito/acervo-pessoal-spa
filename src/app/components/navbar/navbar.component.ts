import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input()
  public name: string = '';
  
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  public signOut(): void {
    this.authService.signOut();
    this.router.navigate(["login"]);
  }
}
