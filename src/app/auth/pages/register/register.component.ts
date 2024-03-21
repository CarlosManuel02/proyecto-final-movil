import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  registerform = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    cedula: ['', [Validators.required, Validators.minLength(11)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.minLength(10)]],
    clave: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public authService: AuthService
  ) {
  }
  ngOnInit() {}

  register() {
    const {nombre, apellido, cedula, correo, telefono, clave} = this.registerform.value;
    if (nombre != null && apellido != null && cedula != null && correo != null && telefono != null && clave != null) {
      this.authService.register(nombre, apellido, cedula, correo, telefono, clave)
        .subscribe((resp) => {
          if (resp) {
            this.router.navigate(['../home']);
            // console.log(resp)
          } else {
            console.log('Error')
          }
        });
    }
  }
}
