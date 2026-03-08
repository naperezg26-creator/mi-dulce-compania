import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {

  usuarioLogueado = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.verificarUsuario();
  }

  verificarUsuario() {
    const usuario = localStorage.getItem('usuario');
    this.usuarioLogueado = !!usuario;
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioLogueado = false;
    this.router.navigate(['/']);
  }
}
