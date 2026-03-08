import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../../services/categorias';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css'
})
export class CategoriasComponent implements OnInit {

  categorias: any[] = [];
  busqueda = '';

  nombre = '';
  descripcion = '';
  estado = 'activo';
  imagenArchivo: File | null = null;
  imagenPreview: string | null = null;

  mensaje = '';
  tipoMensaje = '';

  constructor(private categoriasService: CategoriasService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  get categoriasFiltradas() {
    if (!this.busqueda.trim()) return this.categorias;
    const b = this.busqueda.toLowerCase();
    return this.categorias.filter(c =>
      c.nombre?.toLowerCase().includes(b) ||
      c.descripcion?.toLowerCase().includes(b)
    );
  }

  cargarCategorias() {
    this.categoriasService.listarTodos().subscribe((resp: any) => {
      this.categorias = resp.data;
      this.cdr.detectChanges();
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

  crearCategoria() {
    this.categoriasService.crearCategoria({
      nombre: this.nombre,
      descripcion: this.descripcion,
      estado: this.estado
    }, this.imagenArchivo || undefined).subscribe({
      next: (resp: any) => {
        if (resp.success) {
          this.mostrarMensaje('Categoría creada correctamente', 'exito');
          this.limpiarFormulario();
        } else {
          this.mostrarMensaje(resp.message || 'Error al crear categoría', 'error');
        }
        this.cargarCategorias();
      },
      error: (err) => {
        const msg = err.error?.message || 'Error al crear la categoría';
        this.mostrarMensaje(msg, 'error');
      }
    });
  }

  limpiarFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.estado = 'activo';
    this.imagenArchivo = null;
    this.imagenPreview = null;
  }

  eliminarCategoria(id: string) {
    if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
      this.categoriasService.eliminarCategoria(id).subscribe(() => {
        this.mostrarMensaje('Categoría eliminada correctamente', 'exito');
        this.cargarCategorias();
      });
    }
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
