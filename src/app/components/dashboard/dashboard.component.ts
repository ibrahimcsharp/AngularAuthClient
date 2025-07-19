import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public users: any[] = [];

  constructor(
    private service: UserService,
    private router: Router,
    private authService: AuthService

  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to load users',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  logout() {
    this.authService.sigmOut();
    Swal.fire({
      title: 'Logged Out',
      text: 'You have been logged out successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    this.router.navigate(['login']);
  }

}
