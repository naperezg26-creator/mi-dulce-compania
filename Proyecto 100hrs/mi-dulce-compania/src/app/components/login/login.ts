import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  email = '';
  password = '';
  mensaje = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe((resp: any) => {

      if (resp.state) {

        // Guardamos el token
        localStorage.setItem('token', resp.token);

        this.router.navigate(['/dashboard']);

      } else {
        this.mensaje = resp.mensaje;
      }

    });
  }
}
