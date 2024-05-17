import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { APP_ROUTES } from 'src/app/constants/routes.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginGroup: FormGroup;
  public showPassword: boolean = false;
  public passwordType: string = 'password';

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
    
    StatusBar.setBackgroundColor({ color: 'transparent' });
    StatusBar.setOverlaysWebView({ overlay: true });
    StatusBar.setStyle({ style: Style.Light }); // Use Style.Dark se os ícones precisarem ser claros
  }

  private buildForm(): void {
    this.loginGroup = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.loginGroup.patchValue({ username: 'user', password: '123456789' });
  }

  public toggleShow() {
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }

  public login(): void {
    this.router.navigateByUrl(APP_ROUTES.MAIN);
  }

  public gotoSignUp(): void {
    this.router.navigate([APP_ROUTES.START, APP_ROUTES.REGISTER]);
  }

  public gotoRecoverPassword(): void {
    this.router.navigate([APP_ROUTES.START, APP_ROUTES.RECOVER_PASSWORD]);
  }

  ngOnDestroy() {
    // Restaura a barra de status para a configuração padrão quando a página for deixada
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setBackgroundColor({ color: '#ffffff' });
    StatusBar.setStyle({ style: Style.Default });
  }

}
