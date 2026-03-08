import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../services/categorias';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {

  categorias: any[] = [];

  constructor(private categoriasService: CategoriasService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.categoriasService.listarTodos().subscribe({
      next: (res: any) => {
        this.categorias = (res.data || []).filter((c: any) => c.estado === 'activo');
        this.cdr.detectChanges();
      }
    });
  }
}