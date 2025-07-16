import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type:string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signUpForm: FormGroup;

  constructor(
     private fb: FormBuilder,
     private authService: AuthService
  ) { }

  ngOnInit(): void {
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
    this.isText?  this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password';

  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      console.log('Sign Up Data:', formData);
    } else {
      console.log('Form is invalid');
      ValidateForm.validateForm(this.signUpForm);
    }
  }
  
}
