import { TestBed, inject } from '@angular/core/testing';

import { GmapService } from './gmap.service';

describe('GmapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GmapService]
    });
  });

  it('should be created', inject([GmapService], (service: GmapService) => {
    expect(service).toBeTruthy();
  }));
});
