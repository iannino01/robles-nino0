import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

import { Login } from './login';
import { AuthGoogle } from '../../servicios/auth-google';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        {
        provide: AuthGoogle,
        useValue: {
          autenticado: signal(false),
          error: signal(''),
          inicializado: signal(true),
          perfil: signal(null),
          login: () => {},
          logout: () => {},
          getPerfil: () => null,
          inicializarLoginGmail: () => {},
        },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
