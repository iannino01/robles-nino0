import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { Noticia } from './noticia';
import { ServNoticias } from '../../servicios/noticias';

describe('Noticia', () => {
  let component: Noticia;
  let fixture: ComponentFixture<Noticia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Noticia],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' }),
            },
          },
        },
        {
          provide: ServNoticias,
          useValue: {
            consultarNoticias: () => [
              { id: 1, titulo: 'Noticia de prueba', descripcion: 'Contenido' },
            ],
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Noticia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
