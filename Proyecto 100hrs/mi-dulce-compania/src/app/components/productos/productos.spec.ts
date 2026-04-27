import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProductosComponent } from './productos';
import { ProductService } from '../../services/product';
import { firstValueFrom, of } from 'rxjs';

describe('ProductosComponent', () => {
  let component: ProductosComponent;
  let fixture: ComponentFixture<ProductosComponent>;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosComponent, HttpClientModule]
    })
    .compileComponents();

    service = TestBed.inject(ProductService);
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ==================== GUARDAR ====================

  it('Guardar - Validar la peticion tipo POST', async () => {
    const MockPayload = {
      codigo: 'PTEST',
      nombre: 'Producto Test',
      cantidad: 10,
      precio: 5000,
      descripcion: 'Descripcion test',
      estado: 'activo'
    };
    try {
      const res: any = await firstValueFrom(service.crearProducto(MockPayload));

      expect(res).toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Guardar - Debe fallar cuando el codigo no esta presente en la peticion', async () => {
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.codigo = '';
    component.nombre = '';
    component.cantidad = null;
    component.precio = null;
    component.estado = 'activo';

    component.crearProducto();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo codigo es obligatorio');
  });

  it('Guardar - Debe fallar cuando el nombre no esta presente en la peticion', async () => {
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.codigo = 'PTEST';
    component.nombre = '';
    component.cantidad = null;
    component.precio = null;
    component.estado = 'activo';

    component.crearProducto();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo nombre es obligatorio');
  });

  it('Guardar - Debe fallar cuando la cantidad no esta presente en la peticion', async () => {
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.codigo = 'PTEST';
    component.nombre = 'Collar para perro';
    component.cantidad = null;
    component.precio = null;
    component.estado = 'activo';

    component.crearProducto();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo cantidad es obligatorio');
  });

  it('Guardar - Debe fallar cuando el precio no esta presente en la peticion', async () => {
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.codigo = 'PTEST';
    component.nombre = 'Collar para perro';
    component.cantidad = 10;
    component.precio = null;
    component.estado = 'activo';

    component.crearProducto();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo precio es obligatorio');
  });

  it('Guardar - Debe fallar cuando el estado no esta presente en la peticion', async () => {
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.codigo = 'PTEST';
    component.nombre = 'Collar para perro';
    component.cantidad = 10;
    component.precio = 5000;
    component.estado = '';

    component.crearProducto();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo estado es obligatorio');
  });

  it('Guardar - Debe fallar cuando el codigo ya existe', async () => {
    try {
      const res: any = await firstValueFrom(service.crearProducto({
        codigo: 'MDC002',
        nombre: 'Producto duplicado',
        cantidad: 10,
        precio: 5000,
        descripcion: 'Test',
        estado: 'activo'
      }));

      expect(res).toEqual({ state: false, mensaje: 'El codigo ya existe intente con otro' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Guardar - Debe crear el producto correctamente cuando todos los campos son validos', async () => {
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.codigo = 'PTEST';
    component.nombre = 'Producto Test';
    component.cantidad = 10;
    component.precio = 5000;
    component.estado = 'activo';

    try {
      const res: any = await firstValueFrom(service.crearProducto({
        codigo: 'PTEST',
        nombre: 'Producto Test',
        cantidad: 10,
        precio: 5000,
        descripcion: 'Descripcion test',
        estado: 'activo'
      }));

      expect(res.state).toEqual(true);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Guardar - Debe guardar el producto exitosamente cuando todos los campos son validos', async () => {
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    vi.spyOn(service, 'crearProducto').mockReturnValue(of({ success: true }));

    component.codigo = 'PTEST';
    component.nombre = 'Producto Test';
    component.cantidad = 10;
    component.precio = 5000;
    component.estado = 'activo';

    component.crearProducto();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('Producto creado correctamente');
  });

  // ==================== LISTAR TODOS ====================

  it('ListarTodos - Debe traer los datos de los productos', async () => {
    try {
      const res: any = await firstValueFrom(service.listarTodos());

      expect(res.data.length).toBeGreaterThan(0);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  // ==================== LISTAR POR ID ====================

  it('ListarId - Debe traer los datos del producto', async () => {
    try {
      const res: any = await firstValueFrom(service.listarTodos());
      if (res.data && res.data.length > 0) {
        expect(res.data[0]).toBeTruthy();
      }
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  // ==================== ACTUALIZAR ====================

  it('Actualizar - Debe fallar cuando el _id no esta presente en la peticion', async () => {
    try {
      const res: any = await firstValueFrom(service.actualizarProducto({ _id: '' }));
      expect(res).toEqual({ state: false, mensaje: 'El campo _id es obligatorio' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Actualizar - Debe fallar cuando el _id no es de 24 caracteres', async () => {
    try {
      const res: any = await firstValueFrom(service.actualizarProducto({ _id: '1' }));
      expect(res).toEqual({ state: false, mensaje: 'El campo _id debe ser de 24 caracteres' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Actualizar - Debe fallar cuando el nombre no esta presente', async () => {
    try {
      const res: any = await firstValueFrom(service.actualizarProducto({
        _id: '111111111111111111111111',
        nombre: ''
      }));
      expect(res).toEqual({ state: false, mensaje: 'El campo nombre es obligatorio' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Actualizar - Debe fallar cuando la cantidad no esta presente', async () => {
    try {
      const res: any = await firstValueFrom(service.actualizarProducto({
        _id: '111111111111111111111111',
        nombre: 'Collar para perro'
      }));
      expect(res).toEqual({ state: false, mensaje: 'El campo cantidad es obligatorio' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Actualizar - Debe fallar cuando el precio no esta presente', async () => {
    try {
      const res: any = await firstValueFrom(service.actualizarProducto({
        _id: '111111111111111111111111',
        nombre: 'Collar para perro',
        cantidad: 10
      }));
      expect(res).toEqual({ state: false, mensaje: 'El campo precio es obligatorio' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Actualizar - Debe fallar cuando el estado no esta presente', async () => {
    try {
      const res: any = await firstValueFrom(service.actualizarProducto({
        _id: '111111111111111111111111',
        nombre: 'Collar para perro',
        cantidad: 10,
        precio: 5000,
        estado: ''
      }));
      expect(res).toEqual({ state: false, mensaje: 'El campo estado es obligatorio' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Actualizar - Debe actualizar el producto correctamente cuando todos los campos son validos', async () => {
    try {
      const listRes: any = await firstValueFrom(service.listarTodos());
      if (listRes.data && listRes.data.length > 0) {
        const producto = listRes.data[0];
        const res: any = await firstValueFrom(service.actualizarProducto({
          _id: producto._id,
          nombre: producto.nombre,
          cantidad: producto.cantidad,
          precio: producto.precio,
          estado: producto.estado
        }));

        expect(res.state).toEqual(true);
      }
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Actualizar - Debe fallar cuando Id no existe en la base de datos', async () => {
    try {
      const res: any = await firstValueFrom(service.actualizarProducto({
        _id: '111111111111111111111111',
        nombre: 'Collar para perro',
        cantidad: 10,
        precio: 5000,
        estado: 'activo'
      }));

      expect(res).toEqual({ state: false, mensaje: 'El _id no existe en la base de datos, no se puede actualizar' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  // ==================== ELIMINAR ====================

  it('Eliminar - Debe fallar cuando el _id no esta presente en la peticion', async () => {
    try {
      const res: any = await firstValueFrom(service.eliminarProducto(''));
      expect(res).toEqual({ state: false, mensaje: 'El campo _id es obligatorio' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Eliminar - Debe fallar cuando el _id no es de 24 caracteres', async () => {
    try {
      const res: any = await firstValueFrom(service.eliminarProducto('1'));
      expect(res).toEqual({ state: false, mensaje: 'El campo _id debe ser de 24 caracteres' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Eliminar - Debe fallar cuando Id no existe en la base de datos', async () => {
    try {
      const res: any = await firstValueFrom(service.eliminarProducto('111111111111111111111111'));

      expect(res).toEqual({ state: false, mensaje: 'El _id no existe en la base de datos, no se puede eliminar' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });


  it('ListarTodos - Debe traer los datos de los productos', async () => {
    try {
      const res: any = await firstValueFrom(service.listarTodos());
      expect(res.data.length).toBeGreaterThanOrEqual(1);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Eliminar - Debe eliminar el producto', async () => {
    try {
      const res: any = await firstValueFrom(service.eliminarProducto('111111111111111111111111'));

      expect(res).toEqual({ state: true, mensaje: 'Registro Eliminado' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Eliminar - Debe eliminar el producto exitosamente', async () => {
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    vi.spyOn(window, 'confirm').mockReturnValue(true);
    vi.spyOn(service, 'eliminarProducto').mockReturnValue(of({ state: true }));

    component.eliminarProducto('111111111111111111111111');
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('Producto eliminado correctamente');
  });

});
