import { TestBed } from '@angular/core/testing';

import { PopoversService } from './popovers.service';

describe('PopoversService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopoversService = TestBed.get(PopoversService);
    expect(service).toBeTruthy();
  });
});
