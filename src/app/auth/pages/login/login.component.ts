import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginform = this.fb.group({
    cedula: ['', [Validators.required, Validators.minLength(10)]],
    clave: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public authService: AuthService,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
  }

  login() {
    const {cedula, clave} = this.loginform.value;
    if (cedula != null && clave != null) {

      this.authService.login(cedula, clave)
        .subscribe((resp) => {
          if (resp) {
            this.router.navigate(['../home']);
            // console.log(resp)
          } else {
            console.log('Error')
            this.showAlert('Error', 'Cédula o clave incorrecta');
          }
        });
    }

  }

  private showAlert(type: string, message: string) {
    this.alertController.create({
      header: type,
      message,
      buttons: ['OK']
    }).then(alert => alert.present());

  }

}
