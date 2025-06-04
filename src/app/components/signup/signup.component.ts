import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
     private fb: FormBuilder
  ) { }

  ngOnInit(): void {
     this.signUpForm = this.fb.group({
          email: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', Validators.required]
        });
  }

  togglePasswordVisibility() {
    this.isText = !this.isText;
    this.isText?  this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password';

  }
}
