import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {

  nombre = '';
  email = '';
  password = '';
  mensaje = '';

  constructor(private auth: AuthService, private router: Router) {}

  registrar() {
  this.auth.registro({
    nombre: this.nombre,
    email: this.email,
    password: this.password
  }).subscribe((resp: any) => {

    if (resp.state) {
      this.router.navigate(['/login']);
    } else {
      this.mensaje = resp.mensaje;
    }

  });
}
}