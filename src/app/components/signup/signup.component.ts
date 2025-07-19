import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    debugger;
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password';

  }

  onSubmit() {
    debugger;
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      this.authService.signUp(formData).subscribe({
        next: (res) => {
         Swal.fire({
            title: 'Success',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error?.error.message || 'Signup failed',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      ValidateForm.validateForm(this.signUpForm);
    }
  }

}
