import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tienda.html',
  styleUrl: './tienda.css'
})
export class TiendaComponent implements OnInit {

  productos: any[] = [];
  busqueda = '';
  cargando = true;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this.productService.listarTodos().subscribe({
      next: (res: any) => {
        this.productos = (res.data || []).filter((p: any) => p.estado === 'activo');
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los productos. Intenta más tarde.';
        this.cargando = false;
      }
    });
  }

  get productosFiltrados() {
    if (!this.busqueda.trim()) return this.productos;
    const termino = this.busqueda.toLowerCase();
    return this.productos.filter(p =>
      p.nombre?.toLowerCase().includes(termino) ||
      p.descripcion?.toLowerCase().includes(termino)
    );
  }
}
