import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  listarTodos() {
    return this.http.get(`${this.API_URL}/categorias/ListarTodos`);
  }

  crearCategoria(data: any, imagen?: File) {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('descripcion', data.descripcion || '');
    formData.append('estado', data.estado);
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.post(`${this.API_URL}/categorias/Guardar`, formData);
  }

  eliminarCategoria(_id: string) {
    return this.http.delete(`${this.API_URL}/categorias/Eliminar`, {
      body: { _id }
    });
  }

  actualizarCategoria(data: any) {
    return this.http.put(`${this.API_URL}/categorias/Actualizar`, data);
  }
}
