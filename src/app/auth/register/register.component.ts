import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;

    registrationData: any = [];

    nameValidator = [Validators.required, Validators.minLength(6), Validators.maxLength(1024)];
    emailValidator = [Validators.required,Validators.minLength(6), Validators.maxLength(1024), Validators.email];
    passValidator = [Validators.required, Validators.minLength(6), Validators.maxLength(1024), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')];

  constructor(
    private fb: FormBuilder,
    private register: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void{
    this.registerForm = this.fb.group({
      name: new FormControl('', this.nameValidator),
      username:new FormControl('', this.nameValidator),
      email:new FormControl('', this.emailValidator ),
      password: new FormControl('', this.passValidator ),
      // check: false
    });
  }

  get email() {
    return this.registerForm.get('email')
  }

  get username(){
    return this.registerForm.get('username')
  }

  get password(){
    return this.registerForm.get('password');
  }

  get name(){
    return this.registerForm.get('name');
  }

  onSubmit(): void  {

      this.register.registerUser(this.registerForm.value).subscribe(
         (data) => {
          this.registrationData =  data
          this.router.navigateByUrl('/auth/login')
        },
        err => {
          console.log(err.message)
        }
      );
  }
}
