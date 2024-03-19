import { TestBed } from '@angular/core/testing';

import { DefensaService } from './defensa.service';

describe('DefensaService', () => {
  let service: DefensaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefensaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
