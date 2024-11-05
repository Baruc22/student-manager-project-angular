import { TestBed } from '@angular/core/testing';

import { DatosProfesorService } from './datos-profesor.service';

describe('DatosProfesorService', () => {
  let service: DatosProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
