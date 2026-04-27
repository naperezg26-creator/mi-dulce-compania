import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listarTodos() {
    return this.http.get(`${this.API_URL}/productos/ListarTodos`);
  }

  listarPorId(_id: string) {
    return this.http.get(`${this.API_URL}/productos/ListarId`, { params: { _id } });
  }

  crearProducto(data: any, imagen?: File) {
    const formData = new FormData();
    formData.append('codigo', data.codigo);
    formData.append('nombre', data.nombre);
    formData.append('cantidad', data.cantidad);
    formData.append('precio', data.precio);
    formData.append('descripcion', data.descripcion || '');
    formData.append('estado', data.estado);
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.post(`${this.API_URL}/productos/Guardar`, formData);
  }

  eliminarProducto(_id: string) {
    return this.http.delete(`${this.API_URL}/productos/Eliminar`, {
      body: { _id }
    });
  }

  actualizarProducto(data: any) {
    return this.http.put(`${this.API_URL}/productos/Actualizar`, data);
  }
}
