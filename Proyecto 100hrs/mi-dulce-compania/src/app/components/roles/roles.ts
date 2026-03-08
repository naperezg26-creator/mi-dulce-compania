import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolesService } from '../../services/roles';

@Component({
    selector: 'app-roles',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './roles.html',
    styleUrl: './roles.css'
})
export class RolesComponent implements OnInit {

    roles: any[] = [];

    nombre = '';
    descripcion = '';
    estado = 'activo';

    rolEditando: any = null;
    nombreEdit = '';
    descripcionEdit = '';
    estadoEdit = 'activo';

    mensaje = '';
    tipoMensaje = '';

    constructor(private rolesService: RolesService, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.cargarRoles();
    }

    cargarRoles() {
        this.rolesService.listarTodos().subscribe((resp: any) => {
            this.roles = resp.data;
            this.cdr.detectChanges();
        });
    }

    crearRol() {
        if (!this.nombre.trim()) {
            this.mostrarMensaje('El nombre del rol es obligatorio', 'error');
            return;
        }
        this.rolesService.crearRol({
            nombre: this.nombre,
            descripcion: this.descripcion,
            estado: this.estado
        }).subscribe((resp: any) => {
            if (resp.state) {
                this.mostrarMensaje('Rol creado correctamente', 'exito');
                this.limpiarFormulario();
                this.cargarRoles();
            } else {
                this.mostrarMensaje(resp.mensaje, 'error');
            }
        });
    }

    abrirEdicion(rol: any) {
        this.rolEditando = rol;
        this.nombreEdit = rol.nombre;
        this.descripcionEdit = rol.descripcion;
        this.estadoEdit = rol.estado;
    }

    guardarEdicion() {
        this.rolesService.actualizarRol({
            _id: this.rolEditando._id,
            nombre: this.nombreEdit,
            descripcion: this.descripcionEdit,
            estado: this.estadoEdit
        }).subscribe((resp: any) => {
            if (resp.state) {
                this.mostrarMensaje('Rol actualizado correctamente', 'exito');
                this.cancelarEdicion();
                this.cargarRoles();
            }
        });
    }

    cancelarEdicion() {
        this.rolEditando = null;
    }

    eliminarRol(id: string) {
        if (confirm('¿Seguro que deseas eliminar este rol?')) {
            this.rolesService.eliminarRol(id).subscribe(() => {
                this.mostrarMensaje('Rol eliminado correctamente', 'exito');
                this.cargarRoles();
            });
        }
    }

    limpiarFormulario() {
        this.nombre = '';
        this.descripcion = '';
        this.estado = 'activo';
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
