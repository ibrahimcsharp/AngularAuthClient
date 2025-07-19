import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password';

  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login(formData).subscribe({
        next: (res) => {
          //alert(res.message);
          Swal.fire({
            title: 'Success',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.authService.storeToken(res.token);
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error?.error.message || 'Login failed',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
    else {
      ValidateForm.validateForm(this.loginForm);
    }
  }


}
