import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Noticias } from './noticias';

describe('Noticias', () => {
  let component: Noticias;
  let fixture: ComponentFixture<Noticias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Noticias],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Noticias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
