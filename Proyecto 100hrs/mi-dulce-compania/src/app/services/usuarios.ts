import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    listarTodos() {
        return this.http.get(`${this.API_URL}/usuarios/ListarTodos`);
    }

    crearUsuario(data: any) {
        return this.http.post(`${this.API_URL}/usuarios/registro`, data);
    }

    actualizarUsuario(data: any) {
        return this.http.put(`${this.API_URL}/usuarios/Actualizar`, data);
    }

    eliminarUsuario(_id: string) {
        return this.http.delete(`${this.API_URL}/usuarios/Eliminar`, { body: { _id } });
    }
}
