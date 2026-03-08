import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RolesService {
    private API_URL = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

    listarTodos() {
        return this.http.get(`${this.API_URL}/roles/ListarTodos`);
    }

    crearRol(data: any) {
        return this.http.post(`${this.API_URL}/roles/Guardar`, data);
    }

    actualizarRol(data: any) {
        return this.http.put(`${this.API_URL}/roles/Actualizar`, data);
    }

    eliminarRol(_id: string) {
        return this.http.delete(`${this.API_URL}/roles/Eliminar`, { body: { _id } });
    }
}
