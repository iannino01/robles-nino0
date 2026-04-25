import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

import { Navegacion } from './navegacion';
import { AuthGoogle } from '../../servicios/auth-google';

describe('Navegacion', () => {
  let component: Navegacion;
  let fixture: ComponentFixture<Navegacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navegacion],
      providers: [
        provideRouter([]),
        {
          provide: AuthGoogle,
          useValue: {
            perfil: signal(null),
            logout: () => {},
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navegacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
