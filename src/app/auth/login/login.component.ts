import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl,FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  loginData:any = [];

  nameValidator = [Validators.required, Validators.maxLength(1024), Validators.minLength(6)];
  passwordValidator = [Validators.required, Validators.minLength(6), Validators.maxLength(1024), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')];

  constructor(private fb: FormBuilder,
     private login: AuthService,
     private router: Router
     ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm():void{
    this.loginForm = this.fb.group({
      username: new FormControl('', this.nameValidator),
      password: new FormControl('', this.passwordValidator)
    })
  }

  onSubmit(): void{
    // console.log(this.loginForm.value);
    this.login.loginUser(this.loginForm.value).subscribe(
      data => {
        this.loginData = data;
        this.router.navigateByUrl('/users/dashboard');
      },
      err =>{
        console.log(err.message)
      }
    )
  }

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

}
