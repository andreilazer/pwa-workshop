import { TestBed } from '@angular/core/testing';

import { NetworkStateService } from './network-state.service';

describe('NetworkStateService', () => {
  let service: NetworkStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
