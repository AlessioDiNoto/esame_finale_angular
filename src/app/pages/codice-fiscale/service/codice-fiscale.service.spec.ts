import { TestBed } from '@angular/core/testing';

import { CodiceFiscaleService } from './codice-fiscale.service';

describe('CodiceFiscaleService', () => {
  let service: CodiceFiscaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodiceFiscaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
