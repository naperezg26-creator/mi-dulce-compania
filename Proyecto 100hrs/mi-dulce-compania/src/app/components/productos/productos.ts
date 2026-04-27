import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];
  busqueda = '';

  codigo = '';
  nombre = '';
  descripcion = '';
  precio: number | null = null;
  cantidad: number | null = null;
  estado = 'activo';
  imagenArchivo: File | null = null;
  imagenPreview: string | null = null;

  productoAbierto: string | null = null;

  mensaje = '';
  tipoMensaje = '';

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarProductos();
  }

  get productosFiltrados() {
    if (!this.busqueda.trim()) return this.productos;
    const b = this.busqueda.toLowerCase();
    return this.productos.filter(p =>
      p.nombre?.toLowerCase().includes(b) ||
      p.codigo?.toLowerCase().includes(b) ||
      p.descripcion?.toLowerCase().includes(b)
    );
  }

  cargarProductos() {
    this.productService.listarTodos().subscribe({
      next: (resp: any) => {
        this.productos = resp.data;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  onImagenSeleccionada(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imagenArchivo = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenPreview = e.target?.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(this.imagenArchivo);
    }
  }

  crearProducto() {
    if (!this.codigo.trim()) {
      this.mostrarMensaje('el campo codigo es obligatorio', 'error');
      return;
    }
    if (!this.nombre.trim()) {
      this.mostrarMensaje('el campo nombre es obligatorio', 'error');
      return;
    }
    if (!this.cantidad && this.cantidad !== 0) {
      this.mostrarMensaje('el campo cantidad es obligatorio', 'error');
      return;
    }
    if (!this.precio && this.precio !== 0) {
      this.mostrarMensaje('el campo precio es obligatorio', 'error');
      return;
    }
    if (!this.estado.trim()) {
      this.mostrarMensaje('el campo estado es obligatorio', 'error');
      return;
    }
    this.productService.crearProducto({
      codigo: this.codigo,
      nombre: this.nombre,
      cantidad: this.cantidad,
      precio: this.precio,
      descripcion: this.descripcion,
      estado: this.estado
    }, this.imagenArchivo || undefined).subscribe({
      next: (resp: any) => {
        if (resp.success) {
          this.mostrarMensaje('Producto creado correctamente', 'exito');
          this.limpiarFormulario();
        } else {
          this.mostrarMensaje(resp.message || 'Error al crear producto', 'error');
        }
        this.cargarProductos();
      },
      error: (err) => {
        const msg = err.error?.message || 'Ya existe un producto con ese código';
        this.mostrarMensaje(msg, 'error');
      }
    });
  }

  limpiarFormulario() {
    this.codigo = '';
    this.nombre = '';
    this.cantidad = null;
    this.precio = null;
    this.descripcion = '';
    this.estado = 'activo';
    this.imagenArchivo = null;
    this.imagenPreview = null;
  }

  eliminarProducto(id: string) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productService.eliminarProducto(id).subscribe(() => {
        this.mostrarMensaje('Producto eliminado correctamente', 'exito');
        this.cargarProductos();
      });
    }
  }

  toggleDetalle(id: string) {
    this.productoAbierto = this.productoAbierto === id ? null : id;
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
