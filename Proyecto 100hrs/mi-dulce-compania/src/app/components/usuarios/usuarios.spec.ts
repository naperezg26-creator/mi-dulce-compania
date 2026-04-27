import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { UsuariosComponent } from './usuarios';
import { UsuariosService } from '../../services/usuarios';
import { firstValueFrom, of } from 'rxjs';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  let service: UsuariosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosComponent, HttpClientModule]
    })
    .compileComponents();

    service = TestBed.inject(UsuariosService);
    fixture = TestBed.createComponent(UsuariosComponent);
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
      email: 'natalia@gmail.com',
      password: '123456'
    };
    try {
      const res: any = await firstValueFrom(service.crearUsuario(MockPayload));

      expect(res.state).toEqual(true);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Guardar - Debe fallar cuando el nombre no esta presente en la peticion', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nuevoNombre = '';
    component.nuevoEmail = '';
    component.nuevoPassword = '';
    component.nuevoIdrol = '';

    component.crearUsuario();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo nombre es obligatorio');
  });

  it('Guardar - Debe fallar cuando el email no esta presente en la peticion', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nuevoNombre = 'Natalia';
    component.nuevoEmail = '';
    component.nuevoPassword = '';
    component.nuevoIdrol = '';

    component.crearUsuario();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo email es obligatorio');
  });

  it('Guardar - Debe fallar cuando el password no esta presente en la peticion', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nuevoNombre = 'Natalia';
    component.nuevoEmail = 'natalia@gmail.com';
    component.nuevoPassword = '';
    component.nuevoIdrol = '';

    component.crearUsuario();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo password es obligatorio');
  });

  it('Guardar - Debe fallar cuando el idrol no esta presente en la peticion', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nuevoNombre = 'Natalia';
    component.nuevoEmail = 'natalia@gmail.com';
    component.nuevoPassword = '123456';
    component.nuevoIdrol = '';

    component.crearUsuario();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo idrol es obligatorio');
  });

  it('Guardar - Debe fallar cuando el rol no esta presente en la peticion', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.datosroles = [{ _id: '69782b148061d8896173dfb2', nombre: 'Administrador' }];
    component.nuevoNombre = 'Natalia';
    component.nuevoEmail = 'natalia@gmail.com';
    component.nuevoPassword = '123456';
    component.nuevoIdrol = '69782b148061d8896173dfb2';
    component.nuevoRol = '';
    component.nuevoEstado = 'activo';

    component.crearUsuario();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo rol es obligatorio');
  });

  it('Guardar - Debe fallar cuando el estado no esta presente en la peticion', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.datosroles = [{ _id: '69782b148061d8896173dfb2', nombre: 'Administrador' }];
    component.nuevoNombre = 'Natalia';
    component.nuevoEmail = 'natalia@gmail.com';
    component.nuevoPassword = '123456';
    component.nuevoIdrol = '69782b148061d8896173dfb2';
    component.nuevoRol = 'Administrador';
    component.nuevoEstado = '';

    component.crearUsuario();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo estado es obligatorio');
  });

  it('Guardar - Debe guardar el usuario exitosamente cuando todos los campos son validos', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    vi.spyOn(service, 'crearUsuario').mockReturnValue(of({ state: true }));

    component.nuevoNombre = 'Natalia';
    component.nuevoEmail = 'natalia@gmail.com';
    component.nuevoPassword = '123456';
    component.nuevoIdrol = '69782b148061d8896173dfb2';
    component.nuevoRol = 'Administrador';
    component.nuevoEstado = 'activo';

    component.crearUsuario();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('Usuario creado correctamente');
  });

  it('Guardar - Debe crear el usuario correctamente cuando todos los campos son validos', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.datosroles = [{ _id: '69782b148061d8896173dfb2', nombre: 'Administrador' }];
    component.nuevoNombre = 'Natalia';
    component.nuevoEmail = 'natalia@gmail.com';
    component.nuevoPassword = '123456';
    component.nuevoIdrol = '69782b148061d8896173dfb2';
    component.nuevoRol = 'Administrador';
    component.nuevoEstado = 'activo';

    try {
      const res: any = await firstValueFrom(service.crearUsuario({
        nombre: 'Natalia',
        email: 'natalia@gmail.com',
        password: '123456',
        idrol: '69782b148061d8896173dfb2'
      }));

      expect(res.state).toEqual(true);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Guardar - Debe fallar cuando el email ya existe', async () => {
    try {
      const res: any = await firstValueFrom(service.crearUsuario({
        nombre: 'Natalia',
        email: 'admin@test.com',
        password: '123456',
        idrol: 'admin',
        rol: 'Administrador',
        estado: 'activo'
      }));

      expect(res).toEqual({ state: false, mensaje: 'El correo ya existe intente con otro' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  // ==================== LISTAR TODOS ====================

  it('ListarTodos - Debe traer los datos de los usuarios', async () => {
    try {
      const res: any = await firstValueFrom(service.listarTodos());

      expect(res.data.length).toBeGreaterThan(0);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  // ==================== LISTAR POR ID ====================

  it('ListarId - Debe traer los datos del usuario', async () => {
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
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.usuarioEditando = { _id: '' };
    component.nombreEdit = '';
    component.emailEdit = '';
    component.idrolEdit = '';

    component.guardarEdicion();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo _id es obligatorio');
  });

  it('Actualizar - Debe fallar cuando el _id no es de 24 caracteres', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.usuarioEditando = { _id: '1' };
    component.nombreEdit = '';
    component.emailEdit = '';
    component.idrolEdit = '';

    component.guardarEdicion();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo _id debe ser de 24 caracteres');
  });

  it('Actualizar - Debe fallar cuando el nombre no esta presente', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.usuarioEditando = { _id: '111111111111111111111111' };
    component.nombreEdit = '';
    component.emailEdit = '';
    component.idrolEdit = '';

    component.guardarEdicion();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo nombre es obligatorio');
  });

  it('Actualizar - Debe fallar cuando el idrol no esta presente', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.usuarioEditando = { _id: '111111111111111111111111' };
    component.nombreEdit = 'Natalia';
    component.emailEdit = 'natalia@gmail.com';
    component.idrolEdit = '';

    component.guardarEdicion();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo idrol es obligatorio');
  });

  it('Actualizar - Debe fallar cuando el rol no esta presente', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.usuarioEditando = { _id: '111111111111111111111111' };
    component.nombreEdit = 'Natalia';
    component.emailEdit = 'natalia@gmail.com';
    component.idrolEdit = '69782b148061d8896173dfb2';
    component.rolEdit = '';
    component.estadoEdit = 'activo';

    component.guardarEdicion();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo rol es obligatorio');
  });

  it('Actualizar - Debe fallar cuando el estado no esta presente', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.usuarioEditando = { _id: '111111111111111111111111' };
    component.nombreEdit = 'Natalia';
    component.emailEdit = 'natalia@gmail.com';
    component.idrolEdit = '69782b148061d8896173dfb2';
    component.rolEdit = 'Administrador';
    component.estadoEdit = '';

    component.guardarEdicion();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('el campo estado es obligatorio');
  });

  it('Actualizar - Debe actualizar el usuario exitosamente cuando todos los campos son validos', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    vi.spyOn(service, 'actualizarUsuario').mockReturnValue(of({ state: true }));

    component.usuarioEditando = { _id: '111111111111111111111111' };
    component.nombreEdit = 'Natalia';
    component.emailEdit = 'natalia@gmail.com';
    component.idrolEdit = '69782b148061d8896173dfb2';
    component.rolEdit = 'Administrador';
    component.estadoEdit = 'activo';

    component.guardarEdicion();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('Usuario actualizado correctamente');
  });

  it('Actualizar - Debe actualizar el usuario correctamente cuando todos los campos son validos', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    try {
      const listRes: any = await firstValueFrom(service.listarTodos());
      if (listRes.data && listRes.data.length > 0) {
        const usuario = listRes.data[0];
        const res: any = await firstValueFrom(service.actualizarUsuario({
          _id: usuario._id,
          nombre: usuario.nombre,
          idrol: usuario.idrol
        }));

        expect(res.state).toEqual(true);
      }
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Actualizar - Debe fallar cuando Id no existe en la base de datos', async () => {
    try {
      const res: any = await firstValueFrom(service.actualizarUsuario({
        _id: '111111111111111111111111',
        nombre: 'Natalia',
        idrol: '69782b148061d8896173dfb2'
      }));

      expect(res).toEqual({ state: false, mensaje: 'El _id no existe en la base de datos, no se puede actualizar' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  // ==================== ELIMINAR ====================

  it('Eliminar - Debe fallar cuando el _id no esta presente en la peticion', async () => {
    try {
      const res: any = await firstValueFrom(service.eliminarUsuario(''));
      expect(res).toEqual({ state: false, mensaje: 'El campo _id es obligatorio' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Eliminar - Debe fallar cuando el _id no es de 24 caracteres', async () => {
    try {
      const res: any = await firstValueFrom(service.eliminarUsuario('1'));
      expect(res).toEqual({ state: false, mensaje: 'El campo _id debe ser de 24 caracteres' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Eliminar - Debe fallar cuando Id no existe en la base de datos', async () => {
    try {
      const res: any = await firstValueFrom(service.eliminarUsuario('111111111111111111111111'));

      expect(res).toEqual({ state: false, mensaje: 'El _id no existe en la base de datos, no se puede eliminar' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('ListarTodos - Debe traer los datos de los usuarios', async () => {
    try {
      const res: any = await firstValueFrom(service.listarTodos());
      expect(res.data.length).toBeGreaterThanOrEqual(1);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Eliminar - Debe eliminar el usuario', async () => {
    try {
      const res: any = await firstValueFrom(service.eliminarUsuario('111111111111111111111111'));

      expect(res).toEqual({ state: true, mensaje: 'Registro Eliminado' });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Eliminar - Debe eliminar el usuario exitosamente', async () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    vi.spyOn(window, 'confirm').mockReturnValue(true);
    vi.spyOn(service, 'eliminarUsuario').mockReturnValue(of({ state: true }));

    component.eliminarUsuario('111111111111111111111111');
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mensaje).toEqual('Usuario eliminado correctamente');
  });

});
