import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css'
})
export class ProductoDetalleComponent implements OnInit {

  producto: any = null;
  cargando = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.listarPorId(id).subscribe({
        next: (res: any) => {
          this.producto = res.data;
          this.cargando = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'No se pudo cargar el producto.';
          this.cargando = false;
          this.cdr.detectChanges();
        }
      });
    }
  }
}
