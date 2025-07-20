import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public Users: any[] = [];
  public fullName: string = "";
  public role: string = "";

  constructor(
    private service: UserService,
    private router: Router,
    private authService: AuthService,
    private userStore: UserStoreService

  ) { }

  ngOnInit() {
    this.getAllUsers();

    this.userStore.getFullNameFromStore().subscribe(res => {
      let fullNameFromToken = this.authService.getfullNameFromToken();
      this.fullName = res || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe(res => {
      let roleFromToken = this.authService.gerRoleFromToken();
      this.role = res || roleFromToken;
    });
  }

  getAllUsers() {
    debugger
    this.service.getAllUsers().subscribe({
      next: (res) => {
        this.Users = res;
        console.log(this.Users);
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
