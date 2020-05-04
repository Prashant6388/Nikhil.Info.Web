import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomHttpService } from '../services/custom-http.service';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest =
    {
      email: '',
      password: ''
    };

  signUpRequest =
    {
      name: '',
      email: '',
      password: '',
      contactNo: '',
      acceptedTermAndCondition :false
    }
  constructor(
    private customHttpService: CustomHttpService,
    private storeService: StoreService,
    private router: Router) { }

  ngOnInit(): void {
  }
  login(form: NgForm) {
    if (form.valid) {
      this.customHttpService.login(this.loginRequest).subscribe(response => {
        this.storeService.loggedInUser = response;
        this.router.navigate(['/dashboard']);
      });
    }
  }
  signUp(form: NgForm) {
    if (form.valid) {
      this.customHttpService.postUser(this.signUpRequest).subscribe(response => {
        // this.storeService.loggedInUser = response;
        // this.router.navigate(['/dashboard']);
      });
    }
  }
}