import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  public name: string = '';
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.getLoggedUserData().subscribe({
      next: user => this.name = `${user.first_name} ${user.last_name}`,
    });
  }

  public signOut(): void {
    this.authService.signOut();
    this.router.navigate(["login"]);
  }
}
