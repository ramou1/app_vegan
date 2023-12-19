import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'src/app/constants/routes.const';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerGroup: FormGroup;
  public showPassword: boolean = false;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off-outline';

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.registerGroup = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      birth: [null, [Validators.required]],
      identify: [null, [Validators.required]]
    });

    this.registerGroup.patchValue({ email: 'email@gmail.com', name: 'user', password: '123456789', identify: 'vegetarian' });
    console.log(this.registerGroup.value);
    
  }

  public toggleShow() {
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
    this.passwordIcon = this.showPassword ? 'eye-off' : 'eye-off-outline'
  }

  public register(): void {
    this.router.navigateByUrl(APP_ROUTES.MAIN);
  }

}
