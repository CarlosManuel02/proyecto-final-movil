import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  loginform = this.fb.group({
    cedula: ['', [Validators.required, Validators.minLength(10)]],
    clave: ['', [Validators.required, Validators.minLength(6)]]
  });
  constructor(
    public fb: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit() {}

  login() {
    this.router.navigate(['/home']);

  }
}
