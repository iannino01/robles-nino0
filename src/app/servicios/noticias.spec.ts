import { TestBed } from '@angular/core/testing';

import { ServNoticias } from './noticias';

describe('ServNoticias', () => {
  let service: ServNoticias;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServNoticias);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
