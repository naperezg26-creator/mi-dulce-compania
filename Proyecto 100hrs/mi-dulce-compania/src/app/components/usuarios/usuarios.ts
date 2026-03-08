import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios';

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './usuarios.html',
    styleUrl: './usuarios.css'
})
export class UsuariosComponent implements OnInit {

    usuarios: any[] = [];
    busqueda = '';
    vistaActiva: 'lista' | 'crear' = 'lista';

    nuevoNombre = '';
    nuevoEmail = '';
    nuevoPassword = '';
    nuevoIdrol = 'cliente';

    usuarioEditando: any = null;
    nombreEdit = '';
    emailEdit = '';
    idrolEdit = 'cliente';

    mensaje = '';
    tipoMensaje = '';

    constructor(private usuariosService: UsuariosService, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.cargarUsuarios();
    }

    get usuariosFiltrados() {
        if (!this.busqueda.trim()) return this.usuarios;
        const b = this.busqueda.toLowerCase();
        return this.usuarios.filter(u =>
            u.nombre?.toLowerCase().includes(b) ||
            u.email?.toLowerCase().includes(b) ||
            u.idrol?.toLowerCase().includes(b)
        );
    }

    cargarUsuarios() {
        this.usuariosService.listarTodos().subscribe((resp: any) => {
            this.usuarios = resp.data;
            this.cdr.detectChanges();
        });
    }

    crearUsuario() {
        if (!this.nuevoNombre.trim() || !this.nuevoEmail.trim() || !this.nuevoPassword.trim()) {
            this.mostrarMensaje('Todos los campos son obligatorios', 'error');
            return;
        }
        this.usuariosService.crearUsuario({
            nombre: this.nuevoNombre,
            email: this.nuevoEmail,
            password: this.nuevoPassword,
            idrol: this.nuevoIdrol
        }).subscribe((resp: any) => {
            if (resp.state) {
                this.mostrarMensaje('Usuario creado correctamente', 'exito');
                this.limpiarFormulario();
                this.vistaActiva = 'lista';
                this.cargarUsuarios();
            } else {
                this.mostrarMensaje(resp.mensaje, 'error');
            }
        });
    }

    abrirEdicion(usuario: any) {
        this.usuarioEditando = usuario;
        this.nombreEdit = usuario.nombre;
        this.emailEdit = usuario.email;
        this.idrolEdit = usuario.idrol;
    }

    guardarEdicion() {
        this.usuariosService.actualizarUsuario({
            _id: this.usuarioEditando._id,
            nombre: this.nombreEdit,
            email: this.emailEdit,
            idrol: this.idrolEdit
        }).subscribe((resp: any) => {
            if (resp.state) {
                this.mostrarMensaje('Usuario actualizado correctamente', 'exito');
                this.cancelarEdicion();
                this.cargarUsuarios();
            }
        });
    }

    cancelarEdicion() {
        this.usuarioEditando = null;
    }

    eliminarUsuario(id: string) {
        if (confirm('¿Seguro que deseas eliminar este usuario?')) {
            this.usuariosService.eliminarUsuario(id).subscribe(() => {
                this.mostrarMensaje('Usuario eliminado correctamente', 'exito');
                this.cargarUsuarios();
            });
        }
    }

    limpiarFormulario() {
        this.nuevoNombre = '';
        this.nuevoEmail = '';
        this.nuevoPassword = '';
        this.nuevoIdrol = 'cliente';
    }

    mostrarMensaje(texto: string, tipo: string) {
        this.mensaje = texto;
        this.tipoMensaje = tipo;
        this.cdr.detectChanges();
        setTimeout(() => {
            this.mensaje = '';
            this.cdr.detectChanges();
        }, 3000);
    }
}
