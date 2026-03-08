import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { MisionComponent } from './components/mision/mision';
import { VisionComponent } from './components/vision/vision';
import { ContactoComponent } from './components/contacto/contacto';
import { DetallesComponent } from './components/detalles/detalles';
import { LoginComponent } from './components/login/login';
import { ProductosComponent } from './components/productos/productos';
import { RegistroComponent } from './components/registro/registro';
import { DashboardComponent } from './components/dashboard/dashboard';
import { TiendaComponent } from './components/tienda/tienda';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mision', component: MisionComponent },
  { path: 'vision', component: VisionComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'detalles', component: DetallesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'tienda', component: TiendaComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'productos',
        loadComponent: () => import('./components/productos/productos')
          .then(m => m.ProductosComponent)
      },
      {
        path: 'roles',
        loadComponent: () => import('./components/roles/roles')
          .then(m => m.RolesComponent)
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./components/usuarios/usuarios')
          .then(m => m.UsuariosComponent)
      },
      { path: '', redirectTo: 'productos', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
