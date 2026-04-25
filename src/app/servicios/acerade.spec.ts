import { TestBed } from '@angular/core/testing';

import { ServAcercade } from './acerade';

describe('ServAcercade', () => {
  let service: ServAcercade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServAcercade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
